import React, {Fragment, useEffect, useState} from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {axiosGet} from '../../hooks/useAxios';
import {cities, errorsContent} from '../../data';
import {activitiesPath} from '../../api/routes';
import Button from '../../misc/Button/Button';
import Selector from '../../misc/Selector/Selector';
import RegistrationForm from '../../misc/RegistrationForm/RegistrationForm';
import Alert from '../../misc/Alert/Alert';
import LoadingGif from '../../assets/icons/loading.gif';
import CitySelector from '../../misc/CitySelector/CitySelector';

const Registration = ({route}) => {
  const navigation = useNavigation();

  const [error, setError] = useState({
    isVisible: false,
    title: '',
    text: '',
  });
  const [nameValue, setNameValue] = useState('');
  const [cityValue, setCityValue] = useState('');
  const [citySelectorVisible, setCitySelectorVisible] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [selectedActivities, setSelectedActivities] = useState([]);
  const [activitiesData, setActivitiesData] = useState([
    {
      activity_id: 0,
      activity_name: 'Activities list is loading',
      activity_img: LoadingGif,
    },
  ]);

  const email = route.params.email;
  const password = route.params.password;
  const stringedActivities = JSON.stringify(selectedActivities);

  const checkInputs = () => {
    if (uploadedImage !== null) {
      if (nameValue.length > 3) {
        if (cityValue.length > 0) {
          if (selectedActivities.length !== 0) {
            stackNavigate('PrivacyBubble', {
              email,
              password,
              name: nameValue,
              city: cityValue,
              activities: stringedActivities,
              image: uploadedImage,
            });
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
    } else {
      setError({
        isVisible: true,
        title: errorsContent.avoidPicture.title,
        text: errorsContent.avoidPicture.text,
      });
    }
  };

  const getActivities = async () => {
    const request = await axiosGet(activitiesPath)
      .then((res) => {
        console.log('res', res);
        setActivitiesData(res);
      })
      .catch((error) => console.log('error', error));
  };

  const stackNavigate = (route, params) => {
    navigation.navigate(route, params);
  };

  const hideAlert = () => {
    setTimeout(() => {
      setError({isVisible: false, title: '', text: ''});
    }, 500);
  };

  const showCitySelector = () => {
    setCitySelectorVisible(true);
  };

  const hideCitySelector = () => {
    setCitySelectorVisible(false);
  };

  useEffect(() => {
    getActivities();
  }, []);

  const renderAlert = error.isVisible ? (
    <Alert
      title={error.title}
      text={error.text}
      type="error"
      closeAction={hideAlert}
    />
  ) : null;

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

  return (
    <Fragment>
      {renderAlert}
      {renderCitySelector}
      <ScrollView style={s.container}>
        <View style={s.wrapper}>
          <View style={s.wrapper}>
            <RegistrationForm
              cityValue={cityValue}
              showCitySelector={showCitySelector}
              onNameChange={(name) => setNameValue(name)}
              onImageLoaded={(image) => setUploadedImage(image)}
            />
          </View>
          <View style={s.wrapper}>
            <Selector
              activities={activitiesData}
              selectedActivities={selectedActivities}
              onActivityChange={(activities) =>
                setSelectedActivities(activities)
              }
            />
          </View>
          <View style={s.wrapper}>
            <Button
              text={'Continue'}
              style={'orange'}
              action={() => checkInputs()}
            />
          </View>
        </View>
      </ScrollView>
    </Fragment>
  );
};

export default Registration;

const s = StyleSheet.create({
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
});
