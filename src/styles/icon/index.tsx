import React from 'react';

import Add from '../icons/add';
import AddImage from '../icons/add-image';
import Aim from '../icons/aim';
import Archiveds from '../icons/archiveds';
import ArrowBack from '../icons/arrow-back';
import Attach from '../icons/attach';
import Back from '../icons/back';
import Block from '../icons/block';
import Camera from '../icons/camera';
import Cell from '../icons/cell';
import ChatEmpty from '../icons/chat-empty';
import Chat from '../icons/chat';
import Check from '../icons/check';
import CheckProfile from '../icons/check-profile';
import CircleStar from '../icons/circle-star';
import CirclePosts from '../icons/circle-posts';
import Clear from '../icons/clear';
import Clock from '../icons/clock';
import Close from '../icons/close';
import Comments from '../icons/comments';
import Contacts from '../icons/contacts';
import ContactsEmpty from '../icons/contacts-empty';
import DoubleV from '../icons/double-v';
import DoublePic from '../icons/double-picutres';
import Down from '../icons/down';
import Edit from '../icons/edit';
import EditPic from '../icons/edit-pic';
import Email from '../icons/email';
import Eye from '../icons/eye';
import EyeSvg from '../icons/eye-svg';
import Exit from '../icons/exit';
import Feather from '../icons/feather';
import Filter from '../icons/filter';
import Flag from '../icons/country-flags';
import Followers from '../icons/followers';
import Heart from '../icons/heart';

import HelpTab from '../icons/help-tab';
import HelpArrow from '../icons/help-arrow';
import LocFixed from '../icons/loc-fixed';
import Location from '../icons/location';
import Loupe from '../icons/loupe';
import Megaphone from '../icons/megaphone';

import Notification from '../icons/notification';
import NotificationEmpty from '../icons/notifications-empty';
import OpenImage from '../icons/open-image';
import Pause from '../icons/pause';

import PickedImage from '../icons/picked-image';
import Picture from '../icons/picture';
import Pin from '../icons/pin';
import Play from '../icons/play';
import PlayOut from '../icons/play-out';
import ProfileIcon from '../icons/profile';
import Plus from '../icons/plus';
import Polygon from '../icons/polygon';
import PostChat from '../icons/post-chat';

import Recent from '../icons/recent';
import Right from '../icons/right';
import Sad from '../icons/sad';
import SaveAudio from '../icons/save-audio';
import Search from '../icons/search';
import SearchEmpty from '../icons/search-empty';
import Send from '../icons/send';
import SendMessage from '../icons/send-message';
import Shuffle from '../icons/shuffle';
import Social from '../icons/social';
import Star from '../icons/star';
import StarBright from '../icons/star-bright';
import StarEmpty from '../icons/star-empty';
import StarOut from '../icons/star-out';
import Stop from '../icons/stop';
import Terms from '../icons/terms';
import Tools from '../icons/tools';
import TrashCan from '../icons/trash-can';
import TripleDot from '../icons/triple-dot';
import User from '../icons/user';
import Verified from '../icons/verified';
import View from '../icons/view';

export interface IconBase {
    color?: string;
    width?: number;
    height?: number;
    type?: string;
    singleV?: boolean;
}

interface Props {
    name: IconName;
    color?: string;
    width?: number;
    height?: number;
    type?: string;
    singleV?: boolean;
}

export function Icon({ name, color, height, width, type, singleV }: Props) {
    const SVGIcon = iconRegistry[name];
    return (
        <SVGIcon
            color={color}
            height={height}
            width={width}
            type={type}
            singleV={singleV}
        />
    );
}

export const iconRegistry = {
    add: Add,
    addImage: AddImage,
    aim: Aim,
    archiveds: Archiveds,
    arrowBack: ArrowBack,
    attach: Attach,
    back: Back,
    block: Block,
    camera: Camera,
    cell: Cell,
    chatEmpty: ChatEmpty,
    chat: Chat,
    check: Check,
    checkProfile: CheckProfile,
    circleStar: CircleStar,
    circlePosts: CirclePosts,
    clear: Clear,
    clock: Clock,
    close: Close,
    comments: Comments,
    contacts: Contacts,
    contactsEmpty: ContactsEmpty,
    doubleV: DoubleV,
    doublePic: DoublePic,
    down: Down,
    edit: Edit,
    editPic: EditPic,
    email: Email,
    eye: Eye,
    eyeSvg: EyeSvg,
    exit: Exit,
    feather: Feather,
    filter: Filter,
    flag: Flag,
    followers: Followers,
    heart: Heart,
    helpTab: HelpTab,
    helpArrow: HelpArrow,
    locFixed: LocFixed,
    location: Location,
    loupe: Loupe,
    megaphone: Megaphone,
    notification: Notification,
    notificationEmpty: NotificationEmpty,
    openImage: OpenImage,
    pause: Pause,
    pickedImage: PickedImage,
    picture: Picture,
    pin: Pin,
    play: Play,
    playOut: PlayOut,
    profileIcon: ProfileIcon,
    plus: Plus,
    polygon: Polygon,
    postChat: PostChat,
    recent: Recent,
    right: Right,
    sad: Sad,
    saveAudio: SaveAudio,
    search: Search,
    searchEmpty: SearchEmpty,
    send: Send,
    sendMessage: SendMessage,
    shuffle: Shuffle,
    social: Social,
    star: Star,
    starBright: StarBright,
    starEmpty: StarEmpty,
    starOut: StarOut,
    stop: Stop,
    terms: Terms,
    tools: Tools,
    trashCan: TrashCan,
    tripleDot: TripleDot,
    user: User,
    verified: Verified,
    view: View
};

type IconType = typeof iconRegistry;

type IconName = keyof IconType;
