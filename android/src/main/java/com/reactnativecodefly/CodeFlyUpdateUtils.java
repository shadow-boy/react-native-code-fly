package com.reactnativecodefly;

import android.content.Context;
import android.util.Base64;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.security.DigestInputStream;
import java.security.KeyFactory;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.PublicKey;
import java.security.spec.X509EncodedKeySpec;
import java.util.ArrayList;
import java.util.Collections;

public class CodeFlyUpdateUtils {

    public static final String NEW_LINE = System.getProperty("line.separator");

    // Note: The hashing logic here must mirror the hashing logic in other native SDK's, as well as in the
    // CLI. Ensure that any changes here are propagated to these other locations.
    public static boolean isHashIgnored(String relativeFilePath) {
        final String __MACOSX = "__MACOSX/";
        final String DS_STORE = ".DS_Store";
        final String CodeFly_METADATA = ".CodeFlyrelease";

        return relativeFilePath.startsWith(__MACOSX)
                || relativeFilePath.equals(DS_STORE)
                || relativeFilePath.endsWith("/" + DS_STORE)
                || relativeFilePath.equals(CodeFly_METADATA)
                || relativeFilePath.endsWith("/" + CodeFly_METADATA);
    }

    private static void addContentsOfFolderToManifest(String folderPath, String pathPrefix, ArrayList<String> manifest) {
        File folder = new File(folderPath);
        File[] folderFiles = folder.listFiles();
        for (File file : folderFiles) {
            String fileName = file.getName();
            String fullFilePath = file.getAbsolutePath();
            String relativePath = (pathPrefix.isEmpty() ? "" : (pathPrefix + "/")) + fileName;

            if (CodeFlyUpdateUtils.isHashIgnored(relativePath)) {
                continue;
            }

            if (file.isDirectory()) {
                addContentsOfFolderToManifest(fullFilePath, relativePath, manifest);
            } else {
                try {
                    manifest.add(relativePath + ":" + computeHash(new FileInputStream(file)));
                } catch (FileNotFoundException e) {
                    // Should not happen.
                    throw new CodeFlyUnknownException("Unable to compute hash of update contents.", e);
                }
            }
        }
    }

    private static String computeHash(InputStream dataStream) {
        MessageDigest messageDigest = null;
        DigestInputStream digestInputStream = null;
        try {
            messageDigest = MessageDigest.getInstance("SHA-256");
            digestInputStream = new DigestInputStream(dataStream, messageDigest);
            byte[] byteBuffer = new byte[1024 * 8];
            while (digestInputStream.read(byteBuffer) != -1) ;
        } catch (NoSuchAlgorithmException | IOException e) {
            // Should not happen.
            throw new CodeFlyUnknownException("Unable to compute hash of update contents.", e);
        } finally {
            try {
                if (digestInputStream != null) digestInputStream.close();
                if (dataStream != null) dataStream.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

        byte[] hash = messageDigest.digest();
        return String.format("%064x", new java.math.BigInteger(1, hash));
    }

    public static void copyNecessaryFilesFromCurrentPackage(String diffManifestFilePath, String currentPackageFolderPath, String newPackageFolderPath) throws IOException {
        FileUtils.copyDirectoryContents(currentPackageFolderPath, newPackageFolderPath);
        JSONObject diffManifest = CodeFlyUtils.getJsonObjectFromFile(diffManifestFilePath);
        try {
            JSONArray deletedFiles = diffManifest.getJSONArray("deletedFiles");
            for (int i = 0; i < deletedFiles.length(); i++) {
                String fileNameToDelete = deletedFiles.getString(i);
                File fileToDelete = new File(newPackageFolderPath, fileNameToDelete);
                if (fileToDelete.exists()) {
                    fileToDelete.delete();
                }
            }
        } catch (JSONException e) {
            throw new CodeFlyUnknownException("Unable to copy files from current package during diff update", e);
        }
    }

    public static String findJSBundleInUpdateContents(String folderPath, String expectedFileName) {
        File folder = new File(folderPath);
        File[] folderFiles = folder.listFiles();
        for (File file : folderFiles) {
            String fullFilePath = CodeFlyUtils.appendPathComponent(folderPath, file.getName());
            if (file.isDirectory()) {
                String mainBundlePathInSubFolder = findJSBundleInUpdateContents(fullFilePath, expectedFileName);
                if (mainBundlePathInSubFolder != null) {
                    return CodeFlyUtils.appendPathComponent(file.getName(), mainBundlePathInSubFolder);
                }
            } else {
                String fileName = file.getName();
                if (fileName.equals(expectedFileName)) {
                    return fileName;
                }
            }
        }

        return null;
    }

    public static String getHashForBinaryContents(Context context, boolean isDebugMode) {
        try {
            return CodeFlyUtils.getStringFromInputStream(context.getAssets().open(CodeFlyConstants.CODE_FLY_HASH_FILE_NAME));
        } catch (IOException e) {
            try {
                return CodeFlyUtils.getStringFromInputStream(context.getAssets().open(CodeFlyConstants.CODE_FLY_OLD_HASH_FILE_NAME));
            } catch (IOException ex) {
                if (!isDebugMode) {
                    // Only print this message in "Release" mode. In "Debug", we may not have the
                    // hash if the build skips bundling the files.
                    CodeFlyUtils.log("Unable to get the hash of the binary's bundled resources - \"codefly.gradle\" may have not been added to the build definition.");
                }
            }
            return null;
        }
    }

    // Hashing algorithm:
    // 1. Recursively generate a sorted array of format <relativeFilePath>: <sha256FileHash>
    // 2. JSON stringify the array
    // 3. SHA256-hash the result
    public static void verifyFolderHash(String folderPath, String expectedHash) {
        CodeFlyUtils.log("Verifying hash for folder path: " + folderPath);
        ArrayList<String> updateContentsManifest = new ArrayList<>();
        addContentsOfFolderToManifest(folderPath, "", updateContentsManifest);
        //sort manifest strings to make sure, that they are completely equal with manifest strings has been generated in cli!
        Collections.sort(updateContentsManifest);
        JSONArray updateContentsJSONArray = new JSONArray();
        for (String manifestEntry : updateContentsManifest) {
            updateContentsJSONArray.put(manifestEntry);
        }

        // The JSON serialization turns path separators into "\/", e.g. "CodeFly\/assets\/image.png"
        String updateContentsManifestString = updateContentsJSONArray.toString().replace("\\/", "/");
        CodeFlyUtils.log("Manifest string: " + updateContentsManifestString);

        String updateContentsManifestHash = computeHash(new ByteArrayInputStream(updateContentsManifestString.getBytes()));

        CodeFlyUtils.log("Expected hash: " + expectedHash + ", actual hash: " + updateContentsManifestHash);
        if (!expectedHash.equals(updateContentsManifestHash)) {
            throw new CodeFlyInvalidUpdateException("The update contents failed the data integrity check.");
        }

        CodeFlyUtils.log("The update contents succeeded the data integrity check.");
    }



    public static PublicKey parsePublicKey(String stringPublicKey) {
        try {
            //remove unnecessary "begin/end public key" entries from string
            stringPublicKey = stringPublicKey
                    .replace("-----BEGIN PUBLIC KEY-----", "")
                    .replace("-----END PUBLIC KEY-----", "")
                    .replace(NEW_LINE, "");
            byte[] byteKey = Base64.decode(stringPublicKey.getBytes(), Base64.DEFAULT);
            X509EncodedKeySpec X509Key = new X509EncodedKeySpec(byteKey);
            KeyFactory kf = KeyFactory.getInstance("RSA");

            return kf.generatePublic(X509Key);
        } catch (Exception e) {
            CodeFlyUtils.log(e.getMessage());
            CodeFlyUtils.log(e.getStackTrace().toString());
            return null;
        }
    }


}
