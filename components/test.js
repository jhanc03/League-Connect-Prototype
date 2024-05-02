let authors = test.map( x => x.author )

'./assets/LoL_Icon_Rendered_Hi-Res.png'

(function () {
    let { status } = await Location.requestForegroundPermissionsAsync();
    console.log(status);
    if (status !== 'granted') {
      console.log("denied")
      setErrorMsg('Permission to access location was denied');
      return;
    }

    console.log("status", status); // <=== always says "granted"

    let location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Highest,
      maximumAge: 10000,
      timeout: 5000
    });
    console.log({ location }) // <== never reach here.
    setLocation(location);
    setErrorMsg('No ERROR');
})();