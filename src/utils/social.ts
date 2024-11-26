import { amountTextLines, isCheckInExpirated } from '@utils/index';

export const getPostTxtLines = (desc, full) => {
    const lines = amountTextLines({ text: desc });

    return lines > 5 ? (full ? lines : 6) : lines;
};

export const getPostHeight = (post, full = false) => {
    const nameSpace = post?.User?.Name?.length > 35 ? 10 : 0;
    const userSpace = post?.User?._id?.length > 35 ? 10 : 0;
    const fullExtra = full ? 30 : 0;
    const extra = nameSpace + userSpace + fullExtra;
    const hasFiles = post?.Images?.length || post?.Videos?.length;

    if (post?.Help) {
        let additional = post.Help?.Urgency ? 40 : 0;

        if (hasFiles && full) additional += 380;
        if (post.Text && full) additional += getPostTxtLines(post.Text, full);
        if (post.Text && !full) additional += 30;

        return (
            getPostTxtLines(post.Address, full) * 16 + 200 + additional + extra
        );
    }

    if (post?.CheckIn) {
        const expirated = isCheckInExpirated(post.CreatedAt);

        if (expirated) return 0;

        const additional = hasFiles ? (full ? 390 : 380) : 0;

        const textHeight = getPostTxtLines(post?.Text, full) * 25;

        return textHeight + 190 + additional + extra;
    }

    if (hasFiles)
        return (
            getPostTxtLines(post?.Text, full) * 16 +
            540 +
            fullExtra +
            getPostTxtLines(post?.Text, full) * 7
        );

    const lines = getPostTxtLines(post?.Text, full);
    const lineSpace = lines > 5 ? 230 : lines > 1 ? 208 : 178;

    return lines * 16 + lineSpace + extra;
};
