cd ./android
./gradlew clean
cd ..

npx react-native bundle --platform android --dev false --entry-file index.js --reset-cache --bundle-output android/app/src/main/assets/index.android.bundle --sourcemap-output android/app/src/main/assets/index.android.bundle.packager.map --minify true

cd ./android
./gradlew assembleRelease
./gradlew bundleRelease