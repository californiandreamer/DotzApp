import React, {Fragment, useEffect, useState} from 'react';
import {StyleSheet, View, ScrollView, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import * as turf from '@turf/turf';
import MapboxGL from '@react-native-mapbox-gl/maps';
import {
  cities,
  defaultLocation,
  errorsContent,
  privacyBubbleData,
  privacyPolicyData,
  profileUpdatedContent,
  termsAndConditionsData,
} from '../../data';
import {activitiesPath, profileUpdatePath} from '../../api/routes';
import {getItem} from '../../hooks/useAsyncStorage';
import {getHeadersWithToken} from '../../hooks/useApiData';
import {axiosGet, axiosPost} from '../../hooks/useAxios';
import Alert from '../../misc/Alert/Alert';
import Button from '../../misc/Button/Button';
import Selector from '../../misc/Selector/Selector';
import RegistrationForm from '../../misc/RegistrationForm/RegistrationForm';
import LoadingGif from '../../assets/icons/loading.gif';
import CitySelector from '../../misc/CitySelector/CitySelector';
import Header from '../../misc/Header/Header';
import {TouchableOpacity} from 'react-native-gesture-handler';
import ModalInfo from '../../misc/ModalInfo/ModalInfo';

const Settings = ({route}) => {
  const navigation = useNavigation();

  const [error, setError] = useState({
    isVisible: false,
    title: '',
    text: '',
  });
  const [toggle, setToggle] = useState(false);
  const [nameValue, setNameValue] = useState('');
  const [cityValue, setCityValue] = useState('');
  const [imageUri, setImageUri] = useState('');
  const [citySelectorVisible, setCitySelectorVisible] = useState(false);
  const [termsVisible, setTermsVisible] = useState(false);
  const [privacyPolicyVisible, setPrivacyPolicyVisible] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  console.log('uploadedImage', uploadedImage);
  const [privacyBubble, setPrivacyBubble] = useState(defaultLocation);
  const [selectedActivities, setSelectedActivities] = useState([]);
  const [activitiesData, setActivitiesData] = useState([
    {
      activity_id: 0,
      activity_name: 'Activities list is loading',
      activity_img: LoadingGif,
    },
  ]);

  const center = privacyBubble;
  const radius = privacyBubbleData.distance;
  const options = {
    steps: 64,
    units: privacyBubbleData.dismentions,
    properties: {foo: 'bar'},
  };
  const myCircle = turf.circle(center, radius, options);

  const getProfileData = async () => {
    const data = await getItem('profile');
    const parsedData = JSON.parse(data);
    console.log('parsedData', parsedData);
    const profilePrivacyBubble = parsedData.profile_privacy_buble;
    const parsedPrivacyBubble = JSON.parse(profilePrivacyBubble);

    setNameValue(parsedData.app_user_name);
    setCityValue(parsedData.profile_city);
    setSelectedActivities(parsedData.activities);
    setImageUri(parsedData.profile_img_ava);
    setPrivacyBubble(parsedPrivacyBubble);
    setToggle((prev) => !prev);
  };

  const handleUserLocation = (e) => {
    setPrivacyBubble([e.coords.longitude, e.coords.latitude]);
  };

  const handleMapPress = (e) => {
    setPrivacyBubble(e.geometry.coordinates);
  };

  const checkInputs = () => {
    if (nameValue.length > 3) {
      if (cityValue.length > 0) {
        if (selectedActivities.length !== 0) {
          updateProfileRequest();
        } else {
          setError({
            isVisible: true,
            title: errorsContent.invalidActivities.title,
            text: errorsContent.invalidActivities.text,
          });
        }
      } else {
        setError({
          isVisible: true,
          title: errorsContent.invalidCity.title,
          text: errorsContent.invalidCity.text,
        });
      }
    } else {
      setError({
        isVisible: true,
        title: errorsContent.invalidName.title,
        text: errorsContent.invalidName.text,
      });
    }
  };

  const updateProfileRequest = async () => {
    const headers = await getHeadersWithToken('urlencoded');
    const stringedCoordinates = JSON.stringify(privacyBubble);
    const stringedActivities = JSON.stringify(selectedActivities);

    let postData = new FormData();
    postData.append('app_user_name', nameValue);
    postData.append('profile_city', cityValue);
    postData.append('activity_ids', stringedActivities);
    postData.append('profile_privacy_buble', stringedCoordinates);
    if (uploadedImage !== null) {
      postData.append('update_ava', 'true');
      postData.append('profile_img_ava', {
        uri: uploadedImage.uri,
        name: uploadedImage.fileName,
        type: uploadedImage.type,
      });
    }

    const request = await axiosPost(profileUpdatePath, postData, headers);

    if (request.success) {
      setError({
        isVisible: true,
        title: profileUpdatedContent.title,
        text: profileUpdatedContent.text,
      });
    } else {
      setError({
        isVisible: true,
        title: errorsContent.registrationError.title,
        text: errorsContent.registrationError.text,
      });
    }
  };

  const getActivities = async () => {
    await axiosGet(activitiesPath).then((res) => setActivitiesData(res));
  };

  const showCitySelector = () => {
    setCitySelectorVisible(true);
  };

  const hideCitySelector = () => {
    setCitySelectorVisible(false);
  };

  const hideAlert = () => {
    setTimeout(() => {
      setError({isVisible: false, title: '', text: ''});
    }, 500);
  };

  useEffect(() => {
    getActivities();
    getProfileData();
  }, []);

  const renderHeader = <Header title={'Settings'} />;

  const renderAlert = error.isVisible ? (
    <Alert
      title={error.title}
      text={error.text}
      type="error"
      closeAction={hideAlert}
    />
  ) : null;

  const renderCircle = (
    <MapboxGL.ShapeSource id="id" shape={myCircle}>
      <MapboxGL.LineLayer
        id="routeFill"
        style={{
          lineColor: '#F18303',
          lineWidth: 1,
        }}
      />
    </MapboxGL.ShapeSource>
  );

  const renderMap = (
    <MapboxGL.MapView
      style={s.map}
      compassEnabled={false}
      attributionEnabled={false}
      logoEnabled={false}
      onPress={(e) => handleMapPress(e)}>
      <MapboxGL.Camera zoomLevel={12} followUserLocation />
      <MapboxGL.UserLocation
        minDisplacement={100000}
        // onUpdate={(e) => handleUserLocation(e)}
      />
      <MapboxGL.PointAnnotation id="Point" coordinate={privacyBubble} />
      {renderCircle}
    </MapboxGL.MapView>
  );

  const renderCitySelector = citySelectorVisible ? (
    <CitySelector
      data={cities}
      onCityChange={(city) => {
        setCityValue(city);
        hideCitySelector();
      }}
      hideCitySelector={hideCitySelector}
    />
  ) : null;

  const renderTerms = termsVisible ? (
    <ModalInfo
      data={termsAndConditionsData}
      hideModal={() => setTermsVisible(false)}
    />
  ) : null;

  const renderPrivacyPolicy = privacyPolicyVisible ? (
    <ModalInfo
      data={privacyPolicyData}
      hideModal={() => setPrivacyPolicyVisible(false)}
    />
  ) : null;

  return (
    <Fragment>
      {renderAlert}
      {renderTerms}
      {renderPrivacyPolicy}
      {renderCitySelector}
      <ScrollView style={s.outer}>
        <View style={s.headerWrapper}>{renderHeader}</View>
        <View style={s.container}>
          <View style={s.wrapper}>
            <View style={s.wrapper}>
              <RegistrationForm
                nameValue={nameValue}
                cityValue={cityValue}
                imageUri={imageUri}
                showCitySelector={showCitySelector}
                onNameChange={(name) => setNameValue(name)}
                onImageLoaded={(image) => setUploadedImage(image)}
              />
            </View>
            <View style={s.wrapper}>{renderMap}</View>
            <View style={s.wrapper}>
              <Selector
                toggle={toggle}
                activities={activitiesData}
                selectedActivities={selectedActivities}
                onActivityChange={(activities) =>
                  setSelectedActivities(activities)
                }
              />
            </View>
            <View style={s.wrapper}>
              <TouchableOpacity
                style={s.button}
                activeOpacity={0.8}
                onPress={() => setPrivacyPolicyVisible(true)}>
                <Text style={s.buttonText}>Privacy Policy</Text>
              </TouchableOpacity>
            </View>
            <View style={s.wrapper}>
              <TouchableOpacity
                style={s.button}
                activeOpacity={0.8}
                onPress={() => setTermsVisible(true)}>
                <Text style={s.buttonText}>Terms and Conditions</Text>
              </TouchableOpacity>
            </View>
            <View style={s.wrapper}>
              <Button
                text={'Update'}
                style={'orange'}
                action={() => checkInputs()}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </Fragment>
  );
};

export default Settings;

const s = StyleSheet.create({
  outer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#141F25',
  },
  container: {
    width: '100%',
    height: '100%',
    paddingHorizontal: 16,
    backgroundColor: '#141F25',
  },
  wrapper: {
    width: '100%',
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerWrapper: {
    marginBottom: 50,
  },
  map: {
    width: '100%',
    height: 250,
  },
  button: {
    width: '100%',
    flexDirection: 'row',
  },
  buttonText: {
    width: '100%',
    fontSize: 18,
    fontFamily: 'Gilroy-SemiBold',
    color: '#F0FCFF',
  },
});
