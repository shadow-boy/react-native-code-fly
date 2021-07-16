import * as React from 'react';

import { StyleSheet, View, Text, Image } from 'react-native';
import CodeFly from '../CodeFly';

export default function App() {
  const [result, setResult] = React.useState<number | undefined>();

  React.useEffect(() => {


    CodeFly.checkForUpdate().then(async remote_pack => {
      console.log(`remote_pack----${remote_pack}`);
      if (remote_pack) {
        let local_pack = await remote_pack.download(({ receivedBytes, totalBytes }) => {
          let progress = Number(receivedBytes) / Number(totalBytes);
          console.log(`progress---${progress.toFixed(2)}`);

        })
        if (local_pack) {
          local_pack.install()
        }

      }

    }).catch(error => {
    })

  }, []);

  return (
    <View style={styles.container}>
      {/* <Image source={require("./banner.png")} style={{height:150,width:"100%"}}></Image>
      <View style={{height:20}}></View>
      <Image source={require("./banner.png")} style={{height:50,width:"100%"}}></Image> */}

      <Text>update-before---</Text>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
