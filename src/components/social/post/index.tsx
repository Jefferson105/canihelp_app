import React, { useMemo, useCallback } from 'react';

import Content from '@components/social/post/content';
import Footer from '@components/social/post/footer';
import Header from '@components/social/post/header';
import { useSelector } from '@context/index';

import { BorderVertical } from '@styles/index';

import { isCheckInExpirated, parseRating, userCategory } from '@utils/index';
import { coordsDistance } from '@services/location';
import { IUser } from '@ts/interfaces/user';
import { IHelp } from '@ts/interfaces/help';

interface PostProps {
    id: string;
    address?: string;
    pictures?: Array<{ Url: string }>;
    thumbnail?: string;
    videos: Array<{ Url: string }>;
    description: string;
    likes?: number;
    comments?: number;
    likedByMe: boolean;
    user: IUser;
    date?: string;
    full?: boolean;
    help?: IHelp;
    checkin?: boolean;
    borderBottomColor?: string;
    marg?: string;
    goBackAfterDelete?: boolean;
    onPressImages?: () => void;
    markeds: any;
    shouldLoad: boolean;
    inView: boolean;
    location: any;
    index?: number;
    distance?: number;
}

const Post = ({
    id,
    address,
    pictures,
    videos,
    description,
    likes,
    comments,
    likedByMe,
    user,
    date,
    full = false,
    help,
    checkin,
    borderBottomColor = '#e4e4e4',
    marg = '0 0 30px 0',
    goBackAfterDelete = false,
    onPressImages,
    markeds,
    shouldLoad,
    thumbnail,
    inView,
    location,
    distance: postDistance,
    index
}: PostProps) => {
    const { user: userAuth, social } = useSelector(({ user, social }) => ({
        user,
        social
    }));

    const isOwner = useMemo(() => {
        return userAuth && userAuth?._id === user?._id;
    }, [user, userAuth]);

    const category = useMemo(() => {
        return userCategory(user);
    }, [user]);

    const rating = useMemo(() => {
        return parseRating(
            user.Rating,
            user?.MainCategory ? 'Professional' : 'Client'
        );
    }, [user.MainCategory, user.Rating]);

    const distance = useMemo(() => {
        if (typeof postDistance === 'number') return postDistance;

        return coordsDistance(
            social?.location?.latitude || userAuth?.LocationMobile?.Lat,
            social?.location?.longitude || userAuth?.LocationMobile?.Lon,
            location?.Lat,
            location?.Lon
        );
    }, [location, postDistance, social, userAuth]);

    const styleContainer = useMemo(() => {
        if (full) {
            return {
                flex: 1,
                marg,
                width: null
            };
        } else {
            return {
                flex: 1,
                marg,
                pad: '0 0 25px 0'
            };
        }
    }, [full, marg]);

    const passed = useCallback(() => {
        return isCheckInExpirated(new Date(date));
    }, [date]);

    if (checkin && passed()) return null;

    return (
        <BorderVertical
            type="bottom"
            bdColor={borderBottomColor}
            {...styleContainer}
        >
            <Header
                userId={user._id}
                name={user.Name}
                username={user.UserName}
                category={category}
                photo={user.Photo}
                online={!!user.Online}
                address={address}
                checkin={checkin}
                rating={rating}
                date={date}
                distance={distance}
            />

            <Content
                index={index}
                postId={id}
                checkin={checkin}
                help={help}
                distance={distance}
                description={description}
                pictures={pictures}
                videos={videos}
                address={address}
                full={full}
                onPressImages={onPressImages}
                shouldLoad={shouldLoad}
                inView={inView}
                thumbnail={thumbnail}
            />

            <Footer
                index={index}
                postId={id}
                creator={user}
                likedByMe={likedByMe}
                comments={comments}
                likes={likes}
                full={full}
                help={help}
                hasFiles={
                    (pictures && pictures?.length > 0) ||
                    (videos && videos?.length > 0)
                }
                checkin={checkin}
                address={address}
                description={description}
                markeds={markeds}
                isOwner={isOwner}
                goBackAfterDelete={goBackAfterDelete}
                userId={user._id}
            />
        </BorderVertical>
    );
};

export default Post;
