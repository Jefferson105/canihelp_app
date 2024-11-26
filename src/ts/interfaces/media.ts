import { ReadDirItem } from 'react-native-fs';

import { assetsTypes } from '@ts/types/media';

export interface IAsset {
    name: string;
    assetType: assetsTypes;
    type: string;
    uri: string;
    path?: string;
    mtime: Date;
    size: number;
    duration?: number;
    filename?: string;
    thumb?: string;
}

export interface IFilesCtrl {
    files: IAsset[];
    rawFiles: ReadDirItem[];
    accepts: assetsTypes[];
    size: number;
    page: number;
}
