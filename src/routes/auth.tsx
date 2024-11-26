import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

//Categories
import Categories from '@pages/categories/categories';
import SaveCategories from '@pages/categories/save-categories';
//Chat
import AArchivedMessages from '@pages/chat/archived-messages';
import AConversation from '@pages/chat/conversation';
//Help
import CreateProposal from '@pages/help/create-proposal';
import Help from '@pages/help';
import HelpArchive from '@pages/help/archiveds';
import HelpSend from '@pages/help/help-send';
import Proposal from '@pages/help/proposal';
import MultipleProHelp from '@pages/help/multiple-pro-help';
import TransportationProHelp from '@pages/help/transportation-pro-help';
//Location
import Location from '@pages/location/location';
import SaveLocation from '@pages/location/save-location';
//Notifications
import Notification from '@pages/notifications/notification';
import Notifications from '@pages/notifications/notifications';
//Profile
import EditProfile from '@pages/profile/edit-profile';
import Profile from '@pages/profile/profile';
//Provider Register
import ProviderService from '@pages/provider-register/provider-service';
import CategorieResult from '@pages/provider-register/categorie-results';
import SelectEspc from '@pages/provider-register/select-especialization';
import ProviderKeyWord from '@pages/provider-register/provider-key-word';
import SearchKeyWord from '@pages/provider-register/provider-key-search';
//Register
import ChangePassword from '@pages/register/change-password';
//Ratings
import ARating from '@pages/ratings';
import WriteReview from '@pages/ratings/write-review';
import WriteClientReview from '@pages/ratings/write-client-review';
//Social
import CreatePost from '@pages/social/create-post';
import APost from '@pages/social/post';
import AStories from '@pages/social/stories';
//User
import ABlocks from '@pages/user/blocks';
import AContacts from '@pages/user/contacts';
import AAccount from '@pages/user/account';
import Privacy from '@pages/user/privacy';
import DeleteAcount from '@pages/user/delete-account';
//Tabs
import Tabs from '@components/bottom-tabs';
import { AppRootParamList } from 'types/nav-types';

type AppStackParamList = Pick<
    AppRootParamList,
    | 'Home'
    | 'Privacy'
    | 'Post'
    | 'Stories'
    | 'CreatePost'
    | 'Categories'
    | 'Help'
    | 'HelpArchive'
    | 'HelpFull'
    | 'Proposal'
    | 'CreateProposal'
    | 'Location'
    | 'MultiProHelp'
    | 'TransportationProHelp'
    | 'Profile'
    | 'WriteReview'
    | 'WriteClientReview'
    | 'ArchivedMessages'
    | 'Conversation'
    | 'Account'
    | 'Ratings'
    | 'Contacts'
    | 'Blocks'
    | 'SaveLocation'
    | 'SaveCategories'
    | 'EditProfile'
    | 'ChangePassword'
    | 'ProviderService'
    | 'CategorieResult'
    | 'SelectEspc'
    | 'ProviderKeyWord'
    | 'SearchKeyWord'
    | 'Notification'
    | 'Notifications'
    | 'DeleteAccount'
>;

const { Navigator, Screen } = createStackNavigator<AppStackParamList>();

const AuthNavigation = () => {
    return (
        <Navigator
            initialRouteName="Home"
            screenOptions={{
                gestureEnabled: false,
                headerShown: false
            }}
        >
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
            <Screen
                name="CreatePost"
                component={CreatePost}
                initialParams={{ edit: null }}
            />
            <Screen name="Categories" component={Categories} />
            <Screen name="Help" component={Help} />
            <Screen name="HelpArchive" component={HelpArchive} />
            <Screen name="HelpFull" component={HelpSend} />
            <Screen name="Proposal" component={Proposal} />

            <Screen name="CreateProposal" component={CreateProposal} />
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
            <Screen
                name="WriteReview"
                component={WriteReview}
                options={{ gestureEnabled: false }}
            />
            <Screen name="WriteClientReview" component={WriteClientReview} />
            <Screen name="ArchivedMessages" component={AArchivedMessages} />
            <Screen
                name="Conversation"
                component={AConversation}
                initialParams={{
                    id: null,
                    user: null,
                    isHelp: null,
                    archived: null
                }}
            />
            <Screen name="Account" component={AAccount} />
            <Screen name="Ratings" component={ARating} />
            <Screen name="Contacts" component={AContacts} />
            <Screen name="Blocks" component={ABlocks} />
            <Screen name="SaveLocation" component={SaveLocation} />
            <Screen name="SaveCategories" component={SaveCategories} />
            <Screen name="EditProfile" component={EditProfile} />
            <Screen name="ChangePassword" component={ChangePassword} />
            <Screen name="ProviderService" component={ProviderService} />
            <Screen name="CategorieResult" component={CategorieResult} />
            <Screen name="SelectEspc" component={SelectEspc} />
            <Screen name="ProviderKeyWord" component={ProviderKeyWord} />
            <Screen name="SearchKeyWord" component={SearchKeyWord} />
            <Screen name="Notification" component={Notification} />
            <Screen name="Notifications" component={Notifications} />
            <Screen name="DeleteAccount" component={DeleteAcount} />
        </Navigator>
    );
};

export default AuthNavigation;
