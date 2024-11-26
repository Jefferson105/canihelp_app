import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// not auth screens
import Login from '@pages/register/login';
import EmailTokenValidation from '@pages/register/email-token-validation';
import SignUpCellPhone from '@pages/register/sign-up-cellphone';
import RecoveryPassword from '@pages/register/recovery-password';
import CellPhoneValidation from '@pages/register/cellphone-token-validation';
import FirstStep from '@pages/welcome/first-step';
import SecondStep from '@pages/welcome/second-step';
import ThirdStep from '@pages/welcome/third-step';
import SignUp from '@pages/register/sign-up';
// auth screens
import Categories from '@pages/categories/categories';
import Location from '@pages/location/location';
import Profile from '@pages/profile/profile';
import MultipleProHelp from '@pages/help/multiple-pro-help';
import ARating from '@pages/ratings';
import APost from '@pages/social/post';
import AStories from '@pages/social/stories';
import Tabs from '@components/bottom-tabs';
import TransportationProHelp from '@pages/help/transportation-pro-help';
import Privacy from '@pages/user/privacy';
import { useSelector } from '@context/index';
import { AppRootParamList } from 'types/nav-types';

type UnauthNavigationParamList = Pick<
    AppRootParamList,
    | 'FirstStep'
    | 'SecondStep'
    | 'ThirdStep'
    | 'SignUp'
    | 'EmailTokenValidation'
    | 'SignUpCellPhone'
    | 'Login'
    | 'CellPhoneValidation'
    | 'RecoveryPassword'
    | 'Home'
    | 'Privacy'
    | 'Post'
    | 'Stories'
    | 'Categories'
    | 'Location'
    | 'MultiProHelp'
    | 'TransportationProHelp'
    | 'Profile'
    | 'Ratings'
>;

const { Navigator, Screen } = createStackNavigator<UnauthNavigationParamList>();

const UnauthNavigation = () => {
    const { firstAccess } = useSelector(({ info }) => info);

    return (
        <Navigator
            initialRouteName={firstAccess ? 'FirstStep' : 'Home'}
            screenOptions={{
                gestureEnabled: false,
                headerShown: false
            }}
        >
            <Screen name="FirstStep" component={FirstStep} />
            <Screen name="SecondStep" component={SecondStep} />
            <Screen name="ThirdStep" component={ThirdStep} />
            <Screen name="SignUp" component={SignUp} />
            <Screen
                name="EmailTokenValidation"
                component={EmailTokenValidation}
            />
            <Screen name="SignUpCellPhone" component={SignUpCellPhone} />
            <Screen name="Login" component={Login} />
            <Screen
                name="CellPhoneValidation"
                component={CellPhoneValidation}
            />
            <Screen name="RecoveryPassword" component={RecoveryPassword} />

            {/* Auth screens */}
            <Screen name="Home" component={Tabs} />
            <Screen name="Privacy" component={Privacy} />
            <Screen
                name="Post"
                component={APost}
                initialParams={{ post: null }}
            />
            <Screen
                name="Stories"
                component={AStories}
                initialParams={{ storyId: null }}
            />
            <Screen name="Categories" component={Categories} />
            <Screen
                name="Location"
                component={Location}
                initialParams={{ next: 'Categories' }}
            />
            <Screen
                name="MultiProHelp"
                initialParams={{ filter: 0 }}
                component={MultipleProHelp}
            />
            <Screen
                name="TransportationProHelp"
                component={TransportationProHelp}
            />
            <Screen name="Profile" component={Profile} />
            <Screen name="Ratings" component={ARating} />
        </Navigator>
    );
};

export default UnauthNavigation;
