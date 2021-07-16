export type DownloadProgressCallback = (progress: DownloadProgress) => void;
export type HandleBinaryVersionMismatchCallback = (update: RemotePackage) => void;




export interface DownloadProgress {
    /**
     * The total number of bytes expected to be received for this update.
     */
    totalBytes: number;

    /**
     * The number of bytes downloaded thus far.
     */
    receivedBytes: number;
}

export interface LocalPackage extends Package {
    /**
     * Installs the update by saving it to the location on disk where the runtime expects to find the latest version of the app.
     *
     * @param installMode Indicates when you would like the update changes to take affect for the end-user.
     * @param minimumBackgroundDuration For resume-based installs, this specifies the number of seconds the app needs to be in the background before forcing a restart. Defaults to 0 if unspecified.
     */
    install(installMode?: CodeFly.InstallMode, minimumBackgroundDuration?: number): Promise<void>;
}

export interface Package {
    /**
     * The app binary version that this update is dependent on. This is the value that was
     * specified via the appStoreVersion parameter when calling the CLI's release command.
     */
    appVersion: string;

    /**
     * The deployment key that was used to originally download this update.
     */
    deploymentKey: string;

    /**
     * The description of the update. This is the same value that you specified in the CLI when you released the update.
     */
    description: string;

    /**
     * Indicates whether this update has been previously installed but was rolled back.
     */
    failedInstall: boolean;

    /**
     * Indicates whether this is the first time the update has been run after being installed.
     */
    isFirstRun: boolean;

    /**
     * Indicates whether the update is considered mandatory. This is the value that was specified in the CLI when the update was released.
     */
    isMandatory: boolean;

    /**
     * Indicates whether this update is in a "pending" state. When true, that means the update has been downloaded and installed, but the app restart
     * needed to apply it hasn't occurred yet, and therefore, its changes aren't currently visible to the end-user.
     */
    isPending: boolean;

    /**
     * The internal label automatically given to the update by the CodeFly server. This value uniquely identifies the update within its deployment.
     */
    label: string;

    /**
     * The SHA hash value of the update.
     */
    packageHash: string;

    /**
     * The size of the code contained within the update, in bytes.
     */
    packageSize: number;
}

export interface RemotePackage extends Package {
    /**
     * Downloads the available update from the CodeFly service.
     *
     * @param downloadProgressCallback An optional callback that allows tracking the progress of the update while it is being downloaded.
     */
    download(downloadProgressCallback?: DownloadProgressCallback): Promise<LocalPackage>;

    /**
     * The URL at which the package is available for download.
     */
    downloadUrl: string;
}


/**
 * Decorates a React Component configuring it to sync for updates with the CodeFly server.
 *
 * @param x the React Component that will decorated
 */
declare function CodeFly(x: any): any

declare namespace CodeFly {


    /**
     * Asks the CodeFly service whether the configured app deployment has an update available.
     *
     * @param deploymentKey The deployment key to use to query the CodeFly server for an update.
     * 
     * @param handleBinaryVersionMismatchCallback An optional callback for handling target binary version mismatch
     */
    function checkForUpdate(deploymentKey?: string, handleBinaryVersionMismatchCallback?: HandleBinaryVersionMismatchCallback): Promise<RemotePackage | null>;

    /**
     * Retrieves the metadata for an installed update (e.g. description, mandatory).
     *
     * @param updateState The state of the update you want to retrieve the metadata for. Defaults to UpdateState.RUNNING.
     */
    function getUpdateMetadata(updateState?: UpdateState) : Promise<LocalPackage|null>;


    /**
     * Clear all downloaded CodeFly updates.
     * This is useful when switching to a different deployment which may have an older release than the current package.
     * Note: we don’t recommend to use this method in scenarios other than that (CodeFly will call
     * this method automatically when needed in other cases) as it could lead to unpredictable behavior.
     */
    function clearUpdates(): void;

    /**
     * Immediately restarts the app.
     *
     * @param onlyIfUpdateIsPending Indicates whether you want the restart to no-op if there isn't currently a pending update.
     */
    function restartApp(onlyIfUpdateIsPending?: boolean): void;

    /**
     * Indicates when you would like an installed update to actually be applied.
     */
    enum InstallMode {
        /**
         * Indicates that you want to install the update and restart the app immediately.
         */
        IMMEDIATE,

        /**
         * Indicates that you want to install the update, but not forcibly restart the app.
         */
        ON_NEXT_RESTART,

        /**
         * Indicates that you want to install the update, but don't want to restart the app until the next time
         * the end user resumes it from the background. This way, you don't disrupt their current session,
         * but you can get the update in front of them sooner then having to wait for the next natural restart. 
         * This value is appropriate for silent installs that can be applied on resume in a non-invasive way.
         */
        ON_NEXT_RESUME,

        /**
         * Indicates that you want to install the update when the app is in the background,
         * but only after it has been in the background for "minimumBackgroundDuration" seconds (0 by default),
         * so that user context isn't lost unless the app suspension is long enough to not matter.
         */
        ON_NEXT_SUSPEND
    }

    

    /**
     * Indicates the state that an update is currently in.
     */
    enum UpdateState {
        /**
         * Indicates that an update represents the
         * version of the app that is currently running.
         */
        RUNNING,

        /**
         * Indicates than an update has been installed, but the
         * app hasn't been restarted yet in order to apply it.
         */
        PENDING,

        /**
         * Indicates than an update represents the latest available
         * release, and can be either currently running or pending.
         */
        LATEST
    }


}

export default CodeFly;
