import React, { Component } from 'react'
import { View, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'
import { Text, Toast } from 'native-base'
import { heightToDp, widthToDp } from '../Responsive'
import BaseColor from '../Core/BaseTheme'
import Logo from '../assets/Logo'
import Icon from 'react-native-vector-icons/AntDesign'
import FloatingLabel from 'react-native-floating-labels'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import RBSheet from "react-native-raw-bottom-sheet"
import axios from 'axios'
import DataAccess from '../Core/DataAccess'
import CustomIndicator from '../Core/CustomIndicator'
import AsyncStorage from '@react-native-async-storage/async-storage'
import LanguageChange from '../Core/LanguageChange'
import DeviceInfo from 'react-native-device-info'
import NetInfo from '@react-native-community/netinfo'
import base64 from 'react-native-base64'
import RNFetchBlob from 'rn-fetch-blob'


export default class SigninScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            phoneNumber: '',
            username: '',
            password: '',
            isLoading: false,
            selectedLanguage: '',
            loadPhoneNumber: false,
            cropScreenImages: [],
            cropStepImages: [],
            cropMaterialImages: [],
            livestockScreenImages: [],
            liveStockStepImages: [],
            breedScreenImages: [],
            importantLinksScreen: [],
            nutritionGardenImages: [],
            smallBusinessImages: [],
            labels: [],
            imageloaded: true,
            imageLoading: true
        }

        this.state.selectedLanguage = this.props.route.params.selectedLanguage
        //alert(this.state.languageCode)
    }

    componentDidMount() {
        this.getCustodianMobileNumber()
        //this.setCustodianNumber()
        this.setCustodian()
        //this.getAllData()
        this.downloadImagesForOffline()
    }

    downloadImagesForOffline = async () => {
        var cropScreenImageArray = [];
        var cropStepImagesArray = []
        var cropMaterialImagesArray = []
        var livestockScreenImagesArray = []
        var liveStockStepImagesArray = []
        var breedScreenImagesArray = []
        var importantLinksScreenArray = []
        var nutritionGardenImagesArray = []
        var smallBusinessImagesArray = []
        var labelArray = []


        await axios.get(DataAccess.BaseUrl + DataAccess.AccessUrl + 'files', {
        }).then(function (response) {
            //console.log(response.data.data)
            var crop = response.data.data.find((i) => i.name === 'crop')
            var cropStep = response.data.data.find((i) => i.name === 'cropStep')
            var cropMaterial = response.data.data.find((i) => i.name === 'cropMaterial')
            var livestock = response.data.data.find((i) => i.name === 'livestock')
            var livestockStep = response.data.data.find((i) => i.name === 'livestockStep')
            var breed = response.data.data.find((i) => i.name === 'breed')
            var importantLink = response.data.data.find((i) => i.name === 'importantLink')
            var nutritionGarden = response.data.data.find((i) => i.name === 'nutritionGarden')
            var smallBusiness = response.data.data.find((i) => i.name === 'smallBusiness')
            var label = response.data.data.find((i) => i.name === 'label')
            cropScreenImageArray = crop.fileNames
            cropStepImagesArray = cropStep.fileNames
            cropMaterialImagesArray = cropMaterial.fileNames
            livestockScreenImagesArray = livestock.fileNames
            liveStockStepImagesArray = livestockStep.fileNames
            breedScreenImagesArray = breed.fileNames
            importantLinksScreenArray = importantLink.fileNames
            nutritionGardenImagesArray = nutritionGarden.fileNames
            smallBusinessImagesArray = smallBusiness.fileNames
            labelArray = label.fileNames

            //totalImages = cropScreenImageArray.concat(cropStepImagesArray, cropMaterialImagesArray, livestockScreenImagesArray,liveStockStepImagesArray,breedScreenImagesArray,importantLinksScreenArray,nutritionGardenImagesArray,smallBusinessImagesArray)
            //console.log(cropScreenImageArray)
        }).catch(function (error) {
            console.log(error)
        })
        this.setState({ cropScreenImages: cropScreenImageArray })
        this.setState({ cropStepImages: cropStepImagesArray })
        this.setState({ cropMaterialImages: cropMaterialImagesArray })
        this.setState({ livestockScreenImages: livestockScreenImagesArray })
        this.setState({ liveStockStepImages: liveStockStepImagesArray })
        this.setState({ breedScreenImages: breedScreenImagesArray })
        this.setState({ importantLinksScreen: importantLinksScreenArray })
        this.setState({ nutritionGardenImages: nutritionGardenImagesArray })
        this.setState({ smallBusinessImages: smallBusinessImagesArray })
        this.setState({ labels: labelArray })
        //console.log(this.state.cropScreenImages,"hi")
        this.getCropImage()
    }


    getCropImage = () => {
        var cropImages = []
        var fileNames = []
        var imageUrls = []
        var ext = []
        cropImages = this.state.cropScreenImages
        //alert(cropImages.length)
        for (var i = 0; i < cropImages.length; i++) {
            var names = cropImages[i]
            var editedNames = names.substr(0, names.indexOf('.'))
            var extNames = names.substr(names.indexOf('.') + 1)
            console.log(ext)
            console.log(editedNames)
            fileNames.push(editedNames)
            ext.push(extNames)
            imageUrls.push("http://161.35.122.165:3020/app-property/uploads/crops/" + cropImages[i])
        }

        for (var i = 0; i < imageUrls.length; i++) {
            const { config, fs } = RNFetchBlob;
            let PictureDir = fs.dirs.PictureDir;
            console.log(PictureDir)
            let options = {
                fileCache: true,
                addAndroidDownloads: {
                    useDownloadManager: true,
                    notification: true,
                    path:
                        PictureDir +
                        '/image_' +
                        fileNames[i] + '.' +
                        ext[i],
                    description: 'Image',
                }
            };
            config(options)
                .fetch('GET', imageUrls[i])
                .then(res => {
                    // Showing alert after successful downloading
                    console.log('res -> ', JSON.stringify(res));
                    // alert('Image Downloaded Successfully.');
                });
        }
        console.log(fileNames)
        console.log(imageUrls)
        this.getCropStepImages()
    }

    getCropStepImages = () => {
        var cropImages = []
        var fileNames = []
        var imageUrls = []
        var ext = []
        cropImages = this.state.cropStepImages
        //alert(cropImages.length)
        for (var i = 0; i < cropImages.length; i++) {
            var names = cropImages[i]
            var editedNames = names.substr(0, names.indexOf('.'))
            var extNames = names.substr(names.indexOf('.') + 1)
            console.log(ext)
            console.log(editedNames)
            fileNames.push(editedNames)
            ext.push(extNames)
            imageUrls.push("http://161.35.122.165:3020/app-property/uploads/crops/steps/" + cropImages[i])
        }

        for (var i = 0; i < imageUrls.length; i++) {
            const { config, fs } = RNFetchBlob;
            let PictureDir = fs.dirs.PictureDir;
            console.log(PictureDir)
            let options = {
                fileCache: true,
                addAndroidDownloads: {
                    useDownloadManager: true,
                    notification: true,
                    path:
                        PictureDir +
                        '/image_' +
                        fileNames[i] + '.' +
                        ext[i],
                    description: 'Image',
                }
            };
            config(options)
                .fetch('GET', imageUrls[i])
                .then(res => {
                    // Showing alert after successful downloading
                    console.log('res -> ', JSON.stringify(res));
                    // alert('Image Downloaded Successfully.');
                });
        }
        console.log(fileNames)
        console.log(imageUrls)
        this.getcropMaterial()
    }


    getcropMaterial = () => {
        var cropImages = []
        var fileNames = []
        var imageUrls = []
        var ext = []
        cropImages = this.state.cropMaterialImages
        //alert(cropImages.length)
        for (var i = 0; i < cropImages.length; i++) {
            var names = cropImages[i]
            var editedNames = names.substr(0, names.indexOf('.'))
            var extNames = names.substr(names.indexOf('.') + 1)
            console.log(ext)
            console.log(editedNames)
            fileNames.push(editedNames)
            ext.push(extNames)
            imageUrls.push("http://161.35.122.165:3020/app-property/uploads/crops/materials/" + cropImages[i])
        }

        for (var i = 0; i < imageUrls.length; i++) {
            const { config, fs } = RNFetchBlob;
            let PictureDir = fs.dirs.PictureDir;
            console.log(PictureDir)
            let options = {
                fileCache: true,
                addAndroidDownloads: {
                    useDownloadManager: true,
                    notification: true,
                    path:
                        PictureDir +
                        '/image_' +
                        fileNames[i] + '.' +
                        ext[i],
                    description: 'Image',
                }
            };
            config(options)
                .fetch('GET', imageUrls[i])
                .then(res => {
                    // Showing alert after successful downloading
                    console.log('res -> ', JSON.stringify(res));
                    // alert('Image Downloaded Successfully.');
                });
        }
        console.log(fileNames)
        console.log(imageUrls)
        this.getlivestock()
    }


    getlivestock = () => {
        var cropImages = []
        var fileNames = []
        var imageUrls = []
        var ext = []
        cropImages = this.state.livestockScreenImages
        //alert(cropImages.length)
        for (var i = 0; i < cropImages.length; i++) {
            var names = cropImages[i]
            var editedNames = names.substr(0, names.indexOf('.'))
            var extNames = names.substr(names.indexOf('.') + 1)
            console.log(ext)
            console.log(editedNames)
            fileNames.push(editedNames)
            ext.push(extNames)
            imageUrls.push("http://161.35.122.165:3020/app-property/uploads/livestocks/" + cropImages[i])
        }

        for (var i = 0; i < imageUrls.length; i++) {
            const { config, fs } = RNFetchBlob;
            let PictureDir = fs.dirs.PictureDir;
            console.log(PictureDir)
            let options = {
                fileCache: true,
                addAndroidDownloads: {
                    useDownloadManager: true,
                    notification: true,
                    path:
                        PictureDir +
                        '/image_' +
                        fileNames[i] + '.' +
                        ext[i],
                    description: 'Image',
                }
            };
            config(options)
                .fetch('GET', imageUrls[i])
                .then(res => {
                    // Showing alert after successful downloading
                    console.log('res -> ', JSON.stringify(res));
                    // alert('Image Downloaded Successfully.');
                });
        }
        console.log(fileNames)
        console.log(imageUrls)
        this.getlivestockStep()
    }


    getlivestockStep = () => {
        var cropImages = []
        var fileNames = []
        var imageUrls = []
        var ext = []
        cropImages = this.state.liveStockStepImages
        //alert(cropImages.length)
        for (var i = 0; i < cropImages.length; i++) {
            var names = cropImages[i]
            var editedNames = names.substr(0, names.indexOf('.'))
            var extNames = names.substr(names.indexOf('.') + 1)
            console.log(ext)
            console.log(editedNames)
            fileNames.push(editedNames)
            ext.push(extNames)
            imageUrls.push("http://161.35.122.165:3020/app-property/uploads/livestocks/steps/" + cropImages[i])
        }

        for (var i = 0; i < imageUrls.length; i++) {
            const { config, fs } = RNFetchBlob;
            let PictureDir = fs.dirs.PictureDir;
            console.log(PictureDir)
            let options = {
                fileCache: true,
                addAndroidDownloads: {
                    useDownloadManager: true,
                    notification: true,
                    path:
                        PictureDir +
                        '/image_' +
                        fileNames[i] + '.' +
                        ext[i],
                    description: 'Image',
                }
            };
            config(options)
                .fetch('GET', imageUrls[i])
                .then(res => {
                    // Showing alert after successful downloading
                    console.log('res -> ', JSON.stringify(res));
                    // alert('Image Downloaded Successfully.');
                });
        }
        console.log(fileNames)
        console.log(imageUrls)
        this.getbreed()
    }


    getbreed = () => {
        var cropImages = []
        var fileNames = []
        var imageUrls = []
        var ext = []
        cropImages = this.state.breedScreenImages
        //alert(cropImages.length)
        for (var i = 0; i < cropImages.length; i++) {
            var names = cropImages[i]
            var editedNames = names.substr(0, names.indexOf('.'))
            var extNames = names.substr(names.indexOf('.') + 1)
            console.log(ext)
            console.log(editedNames)
            fileNames.push(editedNames)
            ext.push(extNames)
            imageUrls.push("http://161.35.122.165:3020/app-property/uploads/livestocks/breeds/" + cropImages[i])
        }

        for (var i = 0; i < imageUrls.length; i++) {
            const { config, fs } = RNFetchBlob;
            let PictureDir = fs.dirs.PictureDir;
            console.log(PictureDir)
            let options = {
                fileCache: true,
                addAndroidDownloads: {
                    useDownloadManager: true,
                    notification: true,
                    path:
                        PictureDir +
                        '/image_' +
                        fileNames[i] + '.' +
                        ext[i],
                    description: 'Image',
                }
            };
            config(options)
                .fetch('GET', imageUrls[i])
                .then(res => {
                    // Showing alert after successful downloading
                    console.log('res -> ', JSON.stringify(res));
                    // alert('Image Downloaded Successfully.');
                });
        }
        console.log(fileNames)
        console.log(imageUrls)
        this.getimportantLink()
    }


    getimportantLink = () => {
        var cropImages = []
        var fileNames = []
        var imageUrls = []
        var ext = []
        cropImages = this.state.importantLinksScreen
        //alert(cropImages.length)
        for (var i = 0; i < cropImages.length; i++) {
            var names = cropImages[i]
            var editedNames = names.substr(0, names.indexOf('.'))
            var extNames = names.substr(names.indexOf('.') + 1)
            console.log(ext)
            console.log(editedNames)
            fileNames.push(editedNames)
            ext.push(extNames)
            imageUrls.push("http://161.35.122.165:3020/app-property/uploads/important-links/" + cropImages[i])
        }

        for (var i = 0; i < imageUrls.length; i++) {
            const { config, fs } = RNFetchBlob;
            let PictureDir = fs.dirs.PictureDir;
            console.log(PictureDir)
            let options = {
                fileCache: true,
                addAndroidDownloads: {
                    useDownloadManager: true,
                    notification: true,
                    path:
                        PictureDir +
                        '/image_' +
                        fileNames[i] + '.' +
                        ext[i],
                    description: 'Image',
                }
            };
            config(options)
                .fetch('GET', imageUrls[i])
                .then(res => {
                    // Showing alert after successful downloading
                    console.log('res -> ', JSON.stringify(res));
                    // alert('Image Downloaded Successfully.');
                });
        }
        console.log(fileNames)
        console.log(imageUrls)
        this.getnutritionGarden()
    }



    getnutritionGarden = () => {
        var cropImages = []
        var fileNames = []
        var imageUrls = []
        var ext = []
        cropImages = this.state.nutritionGardenImages
        //alert(cropImages.length)
        for (var i = 0; i < cropImages.length; i++) {
            var names = cropImages[i]
            var editedNames = names.substr(0, names.indexOf('.'))
            var extNames = names.substr(names.indexOf('.') + 1)
            console.log(ext)
            console.log(editedNames)
            fileNames.push(editedNames)
            ext.push(extNames)
            imageUrls.push("http://161.35.122.165:3020/app-property/uploads/nutrition-garden/" + cropImages[i])
        }

        for (var i = 0; i < imageUrls.length; i++) {
            const { config, fs } = RNFetchBlob;
            let PictureDir = fs.dirs.PictureDir;
            console.log(PictureDir)
            let options = {
                fileCache: true,
                addAndroidDownloads: {
                    useDownloadManager: true,
                    notification: true,
                    path:
                        PictureDir +
                        '/image_' +
                        fileNames[i] + '.' +
                        ext[i],
                    description: 'Image',
                }
            };
            config(options)
                .fetch('GET', imageUrls[i])
                .then(res => {
                    // Showing alert after successful downloading
                    console.log('res -> ', JSON.stringify(res));
                    // alert('Image Downloaded Successfully.');
                });
        }
        console.log(fileNames)
        console.log(imageUrls)
        this.getsmallBusiness()
    }


    getsmallBusiness = () => {
        var cropImages = []
        var fileNames = []
        var imageUrls = []
        var ext = []
        cropImages = this.state.smallBusinessImages
        //alert(cropImages.length)
        for (var i = 0; i < cropImages.length; i++) {
            var names = cropImages[i]
            var editedNames = names.substr(0, names.indexOf('.'))
            var extNames = names.substr(names.indexOf('.') + 1)
            console.log(ext)
            console.log(editedNames)
            fileNames.push(editedNames)
            ext.push(extNames)
            imageUrls.push("http://161.35.122.165:3020/app-property/uploads/small-business/" + cropImages[i])
        }

        for (var i = 0; i < imageUrls.length; i++) {
            const { config, fs } = RNFetchBlob;
            let PictureDir = fs.dirs.PictureDir;
            console.log(PictureDir)
            let options = {
                fileCache: true,
                addAndroidDownloads: {
                    useDownloadManager: true,
                    notification: true,
                    path:
                        PictureDir +
                        '/image_' +
                        fileNames[i] + '.' +
                        ext[i],
                    description: 'Image',
                }
            };
            config(options)
                .fetch('GET', imageUrls[i])
                .then(res => {
                    // Showing alert after successful downloading
                    console.log('res -> ', JSON.stringify(res));
                    //alert('Image Downloaded Successfully.');
                });
        }
        //alert("images downloaded successfully")
        console.log(fileNames)
        console.log(imageUrls)
        this.getLabelAudio()
    }


    getLabelAudio = () => {
        var cropImages = []
        var fileNames = []
        var imageUrls = []
        var ext = []
        cropImages = this.state.labels
        //alert(cropImages.length)
        for (var i = 0; i < cropImages.length; i++) {
            var names = cropImages[i]
            var editedNames = names.substr(0, names.indexOf('.'))
            var extNames = names.substr(names.indexOf('.') + 1)
            console.log(ext)
            console.log(editedNames)
            fileNames.push(editedNames)
            ext.push(extNames)
            imageUrls.push("http://161.35.122.165:3020/app-property/uploads/label/" + cropImages[i])
        }

        for (var i = 0; i < imageUrls.length; i++) {
            const { config, fs } = RNFetchBlob;
            let PictureDir = fs.dirs.PictureDir;
            console.log(PictureDir)
            let options = {
                fileCache: true,
                addAndroidDownloads: {
                    useDownloadManager: true,
                    notification: true,
                    path:
                        PictureDir +
                        '/image_' +
                        fileNames[i] + '.' +
                        ext[i],
                    description: 'Image',
                }
            };
            config(options)
                .fetch('GET', imageUrls[i])
                .then(res => {
                    // Showing alert after successful downloading
                    console.log('res -> ', JSON.stringify(res));
                    //alert('Image Downloaded Successfully.');
                });
        }
        // alert("images downloaded successfully")
        this.setState({ imageloaded: false })
        if(this.state.imageloaded === false){
            Toast.show({
            text: "images downloaded successfully",
            duration: 6000,
            type: 'success'
        })
        }
        
        console.log(fileNames)
        console.log(imageUrls)
    }


    guestSignIn = () => {
        this.state.phoneNumber = '1000000000'
        this.state.username = 'Guest'
        this.state.password = '12'
        this.signIn()
        // this.setState({username : 'anonymous@abc.com'})
        // this.setState({password : 'Test@12345'})
    }

    setCustodian = async () => {
        let cus = await AsyncStorage.getItem("cus")
        this.setState({ loadPhoneNumber: false })

        NetInfo.fetch().then(state => {
            var isConnected = state.isConnected
            console.log(isConnected)
            if (isConnected === true) {
                console.log("connected")
            } else {
                this.setState({ phoneNumber: cus })
            }
        })

    }


    getAllData = async () => {
        var allusername = await AsyncStorage.getItem('username')
        var token = await AsyncStorage.getItem('token')
        var encodedUsername = base64.encode(this.state.username)
        var cropObjectsToBeSaved, cropStepsObjectsToBeSaved, cropsMaterialsObjectsToBeSaved, livestockObjectsToBeSaved, liveStockStepMaterialsObjectsToBeSaved, liveStockBreedsObjectsToBeSaved, breedCategoriesObjectsToBeSaved, importantLinksObjectsToBeSaved, nutrationGradenObjectsToBeSaved, livestockStepObjectsToBeSaved, vaccinationToBeSaved, contactListToBeSaved, dryFishObjectsToBeSaved, vegetableVendingObjectsToBeSaved, smallGroceryShopToBeSaved, labelsObjectsToBeSaved;
        await axios.get("http://161.35.122.165:3020/api/v1/get-all-data", {
            headers: {
                'Content-type': "application/json",
                'X-Information': encodedUsername,
                'Authorization': "POP " + token
            }
        }).then(function (response) {
            console.log(response.data, "CROPS NAMES")
            var crops = response.data.crops
            //var cropObjects = crops.substring(1,crops.length-1)
            cropObjectsToBeSaved = crops
            var cropSteps = response.data.cropSteps
            cropStepsObjectsToBeSaved = cropSteps
            var cropsMaterials = response.data.cropsMaterials
            //var cropsMaterialsObjects = cropsMaterials.substring(1,cropsMaterials.length-1)
            cropsMaterialsObjectsToBeSaved = cropsMaterials
            var livestock = response.data.livestock
            //var livestockObjects = livestock.substring(1,livestock.length-1)
            livestockObjectsToBeSaved = livestock
            var liveStockStepMaterials = response.data.liveStockStepMaterials
            //var liveStockStepMaterialsObjects = liveStockStepMaterials.substring(1,liveStockStepMaterials.length-1)
            liveStockStepMaterialsObjectsToBeSaved = liveStockStepMaterials
            var liveStockBreeds = response.data.liveStockBreeds
            //var liveStockBreedsObjects = liveStockBreeds.substring(1,liveStockBreeds.length-1)
            liveStockBreedsObjectsToBeSaved = liveStockBreeds
            var breedCategories = response.data.breedCategories
            //var breedCategoriesObjects = breedCategories.substring(1,breedCategories.length-1)
            breedCategoriesObjectsToBeSaved = breedCategories
            var importantLinks = response.data.importantLinks
            //var importantLinksObjects = importantLinks.substring(1,importantLinks.length-1)
            importantLinksObjectsToBeSaved = importantLinks
            //console.log(importantLinksObjectsToBeSaved)

            var nutrationGraden = response.data.nutrationGraden
            nutrationGradenObjectsToBeSaved = nutrationGraden

            var livestockStep = response.data.livestockStep
            livestockStepObjectsToBeSaved = livestockStep

            var vaccination = response.data.vaccination
            vaccinationToBeSaved = vaccination

            var contactList = response.data.contactList
            contactListToBeSaved = contactList

            var dryFish = response.data.dryFish
            dryFishObjectsToBeSaved = dryFish

            var vegetableVending = response.data.vegetableVending
            vegetableVendingObjectsToBeSaved = vegetableVending

            var smallGroceryShop = response.data.smallGroceryShop
            smallGroceryShopToBeSaved = smallGroceryShop

            var labels = response.data.labels
            labelsObjectsToBeSaved = labels
        }).catch(function (error) {
            console.log(error)
        })

        const offlineDataToBeSaved = { 'username': this.state.username, 'crops': cropObjectsToBeSaved, 'cropSteps': cropStepsObjectsToBeSaved, 'cropsMaterials': cropsMaterialsObjectsToBeSaved, 'livestock': livestockObjectsToBeSaved, 'livestockStep': livestockStepObjectsToBeSaved, 'liveStockStepMaterials': liveStockStepMaterialsObjectsToBeSaved, 'liveStockBreeds': liveStockBreedsObjectsToBeSaved, 'breedCategories': breedCategoriesObjectsToBeSaved, 'importantLinks': importantLinksObjectsToBeSaved, 'nutrationGraden': nutrationGradenObjectsToBeSaved, 'vaccination': vaccinationToBeSaved, 'contactList': contactListToBeSaved, 'dryFish': dryFishObjectsToBeSaved, 'vegetableVending': vegetableVendingObjectsToBeSaved, 'smallGroceryShop': smallGroceryShopToBeSaved, 'labels': labelsObjectsToBeSaved }
        // offlineDataToBeSaved.crops.push(cropObjectsToBeSaved)
        // offlineDataToBeSaved.cropsMaterials.push(cropsMaterialsObjectsToBeSaved)
        // offlineDataToBeSaved.livestock.push(livestockObjectsToBeSaved)
        // offlineDataToBeSaved.liveStockStepMaterials.push(liveStockStepMaterialsObjectsToBeSaved)
        // offlineDataToBeSaved.liveStockBreeds.push(liveStockBreedsObjectsToBeSaved)
        // offlineDataToBeSaved.breedCategories.push(breedCategoriesObjectsToBeSaved)
        // offlineDataToBeSaved.importantLinks.push(importantLinksObjectsToBeSaved)

        const exsistingOfflineData = await AsyncStorage.getItem('offlineData')
        let newOfflineData = JSON.parse(exsistingOfflineData)
        if (!newOfflineData) {
            newOfflineData = []
        }

        var offlineArr = newOfflineData.map(function (item) { return item.username })
        if (offlineArr.includes(this.state.username)) {
            console.log("NO")
        } else {
            newOfflineData.push(offlineDataToBeSaved)
        }


        await AsyncStorage.setItem("offlineData", JSON.stringify(newOfflineData))
            .then(() => {
                this.props.navigation.reset({
                    index: 0,
                    routes: [
                        { name: "DashBoardScreen" }
                    ]
                });
                //alert('‘Offline Data saved successfully’')
                Toast.show({
                    text: "Offline Data saved successfully",
                    duration: 3000,
                    type: 'success'
                })
            })
            .catch(() => {
                console.log('‘There was an error saving the product’')
            })

    }

    setCustodianNumber = async () => {
        let cus = await AsyncStorage.getItem("cus")
        this.setState({ loadPhoneNumber: false })
        this.setState({ phoneNumber: cus })
    }

    checkConnection = () => {
        NetInfo.fetch().then(state => {
            var isConnected = state.isConnected
            console.log(isConnected)
            if (isConnected === true) {
                return this.signIn()
            } else {
                return this.offlineMode()
            }
        })
    }

    offlineMode = async () => {
        // let user = await AsyncStorage.getItem('user')
        // let parsed = JSON.stringify(user)
        // console.log(JSON.stringify(parsed))
        // var specificObject = parsed.find((i) => i.username === this.state.username)
        // console.log(specificObject.username)
        try {
            //var count = 8
            var offlinePassword
            let user = await AsyncStorage.getItem('user');
            let parsed = JSON.parse(user);
            console.log(JSON.stringify(parsed))
            var specificObject = parsed.find((i) => i.username === this.state.username)
            console.log(specificObject.password)
            offlinePassword = specificObject.password
            if (offlinePassword === this.state.password) {
                this.props.navigation.reset({
                    index: 0,
                    routes: [
                        { name: "DashBoardScreen" }
                    ]
                });
            } else {
                alert("please enter a valid password")
            }
            // var valueArr = parsed.map(function(item){ return item.userId });
            // alert(valueArr)
            // var specificObject = parsed.find((i) => i.userId === count)
            // console.log(specificObject.userId)

            //console.log(specificObject.userId = count+1)
            // console.log(specificObject.userId = 6)
            //await AsyncStorage.setItem('products',JSON.stringify(parsed))


            //alert(parsed[0].item = "bitch")
            // await AsyncStorage.setItem('products',JSON.stringify(parsed))
            // console.log(JSON.stringify(parsed))
            //alert(JSON.stringify(parsed));
            // console.log(JSON.stringify(parsed))
        }
        catch (error) {
            alert(error)
        }

    }

    getCustodianMobileNumber = async () => {

        let deviceId = await DeviceInfo.getAndroidId()
        //var load = true
        //this.setState({ loadPhoneNumber: true })
        var phone
        await axios.get(DataAccess.BaseUrl + DataAccess.AccessUrl + DataAccess.CustodianNumber + deviceId, {
        }).then(function (response) {
            //load = false
            console.log(response.data.status)
            if (response.data.status === 1) {
                phone = response.data.data.phone
                AsyncStorage.setItem("cus", JSON.stringify(response.data.data.phone))
            }

        }).catch(function (error) {
            console.log(error)
        })

        // if (load === false) {
        //     this.setState({ loadPhoneNumber: false })
        // }
        this.setState({ phoneNumber: phone })
    }

    signIn = async () => {
        var load = true
        this.setState({ isLoading: true })
        var name = this.state.username
        var redirect = false
        var saveOffline = false


        if (this.state.username === '') {
            return Toast.show({
                text: "please enter username",
                type: 'danger',
                duration: 3000
            })
        } else if (this.state.password === '') {
            return Toast.show({
                text: "please enter password",
                type: 'danger',
                duration: 3000
            })
        }

        await axios.post(DataAccess.BaseUrl + DataAccess.AccessUrl + DataAccess.SignIn, {
            phone: this.state.phoneNumber,
            username: this.state.username,
            password: this.state.password
        }, {
            headers: {

                'Content-type': 'application/json'
            }
        }).then(function (response) {
            console.log(response.data.data._id)
            // console.log(response.data.data.name)
            // console.log(response.data.data.token)
            // console.log(response.data.data.type)
            // console.log(response.data.data.username)
            if (response.data.status === 1) {
                console.log("yes")
                saveOffline = true
                //redirect = true
                Toast.show({
                    text: "Welcome" + " " + name,
                    type: 'success',
                    duration: 3000
                })

                AsyncStorage.setItem("_id", response.data.data._id)
                AsyncStorage.setItem("name", response.data.data.name)
                AsyncStorage.setItem("token", response.data.data.token)
                AsyncStorage.setItem("username", response.data.data.username)
            } else {
                load = false
                Toast.show({
                    text: response.data.msg,
                    type: 'danger',
                    duration: 3000
                })
            }

        }).catch(function (error) {
            load = false
            console.log(error)
        })

        if (load === false) {
            this.setState({ isLoading: false })
        }

        let _id = await AsyncStorage.getItem('_id')
        let reqname = await AsyncStorage.getItem('name')
        let token = await AsyncStorage.getItem('token')
        let username = await AsyncStorage.getItem('username')

        const userToBeSaved = { '_id': _id, 'name': reqname, 'password': this.state.password, 'token': token, 'username': username, 'syncStatus': false, 'lowLand': [], 'highLand': [], 'mediumLand': [], 'patch': [], 'cropData': [], 'livestockData': [], 'moneyManagerData': [], 'costBenifitAnalysis': [] }
        const exsistingUser = await AsyncStorage.getItem('user')
        let newUser = JSON.parse(exsistingUser)
        if (!newUser) {
            newUser = []
        }

        var valueArr = newUser.map(function (item) { return item._id })
        if (valueArr.includes(_id)) {
            console.log("NO")
        } else {
            newUser.push(userToBeSaved)
        }

        await AsyncStorage.setItem("user", JSON.stringify(newUser))
            .then(() => {
                console.log('‘It was saved successfully’')
            })
            .catch(() => {
                console.log('‘There was an error saving the product’')
            })

        // if (redirect === true) {
        //     // this.props.navigation.navigate({
        //     //     name: 'DashBoardScreen'
        //     // })
        //     this.props.navigation.reset({
        //         index: 0,
        //         routes: [
        //             { name: "DashBoardScreen" }
        //         ]
        //     });
        // }

        if (saveOffline === true) {
            Toast.show({
                text: "Please wait while we save your data",
                type: 'success',
                duration: 6000
            })
            this.getAllData()
        } else {
            Toast.show({
                text: "Please Login To Save Offline Data",
                duration: 3000,
                type: 'danger'
            })
        }

    }

    displayData = async () => {
        try {
            //var count = 8
            let user = await AsyncStorage.getItem('offlineData');
            let parsed = JSON.parse(user);
            console.log(JSON.stringify(parsed))
            // var valueArr = parsed.map(function(item){ return item.userId });
            // alert(valueArr)
            // var specificObject = parsed.find((i) => i.userId === count)
            // console.log(specificObject.userId)

            //console.log(specificObject.userId = count+1)
            // console.log(specificObject.userId = 6)
            //await AsyncStorage.setItem('products',JSON.stringify(parsed))


            //alert(parsed[0].item = "bitch")
            // await AsyncStorage.setItem('products',JSON.stringify(parsed))
            // console.log(JSON.stringify(parsed))
            //alert(JSON.stringify(parsed));
            // console.log(JSON.stringify(parsed))
        }
        catch (error) {
            alert(error)
        }
    }


    navigateToRegistration = () => {
        LanguageChange.setLanguage(this.state.selectedLanguage)
        this.props.navigation.navigate('RegistrationScreen')
        this.props.navigation.navigate({
            name: 'RegistrationScreen',
            params: { selectedLanguage: this.state.selectedLanguage }
        })
    }

    render() {
        return (
            <KeyboardAwareScrollView style={{ backgroundColor: BaseColor.BackgroundColor, flex: 1 }}
                keyboardShouldPersistTaps='handled'
            >
                <View >
                    <View style={{ marginTop: heightToDp("3%"), alignSelf: "center" }}>
                        <Logo />
                    </View>
                    <View style={{ marginTop: heightToDp("5%") }}>
                        <Text style={{ fontSize: widthToDp("7%"), alignSelf: 'center', fontFamily: 'Oswald-SemiBold' }}>{LanguageChange.signIn}</Text>
                    </View>
                    {
                        this.state.imageloaded ? <View>
                            <View style={{ marginTop: heightToDp("5%") }}>
                                <CustomIndicator IsLoading={this.state.imageLoading} />
                                <View style={{ marginTop: heightToDp("5%") , alignSelf:'center' }}>
                                    <Text style={{fontSize:widthToDp("6%"),fontFamily: 'Oswald-Medium'}}>Please wait while image is downloading</Text>
                                </View>
                            </View>

                        </View> :
                            <View>
                                <View style={{ marginTop: heightToDp("5%"), marginLeft: widthToDp("8%") }}>
                                    {
                                        this.state.loadPhoneNumber ? <CustomIndicator IsLoading={this.state.loadPhoneNumber} /> : null
                                    }
                                    <Text style={{ fontSize: widthToDp("4.6%"), marginLeft: widthToDp("2%"), fontFamily: 'Oswald-Medium' }}>{this.state.phoneNumber}</Text>
                                    <View style={{ borderBottomColor: 'black', borderBottomWidth: 1, marginTop: heightToDp('0.1%'), width: widthToDp("80%"), marginLeft: widthToDp("2%") }}></View>
                                </View>
                                {/* <View style={{ marginTop: heightToDp("5%"), marginLeft: widthToDp("10%") }}>
                    <Text style={{ fontSize: widthToDp("5%") }}>CONTACT NUMBER</Text>
                </View>
                <View style={{ marginTop: heightToDp("1%"), marginLeft: widthToDp("10%") }}>
                    <Text style={{ fontSize: widthToDp("6%") }}>1234567890</Text>
                </View>
                <View style={{ borderBottomColor: 'black', borderBottomWidth: 1, marginTop: heightToDp('1.5%'), width: widthToDp("80%"), alignSelf: 'center' }}></View> */}
                                <ScrollView>
                                    <View style={{ marginTop: heightToDp("2%"), marginLeft: widthToDp("10%") }}>
                                        <FloatingLabel
                                            labelStyle={styles.labelInput}
                                            inputStyle={styles.input}
                                            style={styles.formInput}
                                            // onBlur={this.onBlur}
                                            onChangeText={(text) => { this.setState({ username: text }) }}
                                        >{LanguageChange.username}</FloatingLabel>
                                    </View>
                                    {/* <View style={{ borderBottomColor: 'black', borderBottomWidth: 1, marginTop: heightToDp('1.5%'), width: widthToDp("80%"), alignSelf: 'center' }}></View> */}
                                    <View style={{ marginTop: heightToDp("2%"), marginLeft: widthToDp("10%"), flexDirection: 'row' }}>
                                        <FloatingLabel
                                            labelStyle={styles.labelInput}
                                            inputStyle={styles.input}
                                            style={styles.formInput}
                                            password={true}

                                            onChangeText={(text) => { this.setState({ password: text }) }}
                                        // onBlur={this.onBlur}
                                        >{LanguageChange.password}</FloatingLabel>
                                    </View>
                                    {/* <View style={{ borderBottomColor: 'black', borderBottomWidth: 1, marginTop: heightToDp('1.5%'), width: widthToDp("80%"), alignSelf: 'center' }}></View> */}
                                    <View style={{ marginLeft: widthToDp("50%"), marginTop: heightToDp("0.5%"), width: widthToDp("37%") }}>
                                        <Text style={{ fontFamily: 'Oswald-Medium', fontSize: widthToDp("4%") }}>{LanguageChange.forgotPassword}</Text>
                                    </View>
                                    {
                                        this.state.isLoading ? <CustomIndicator IsLoading={this.state.isLoading} /> : null
                                    }
                                    <TouchableOpacity onPress={() => this.checkConnection()}>
                                        <View style={{ backgroundColor: BaseColor.SecondaryColor, marginTop: heightToDp("5%"), width: widthToDp("37%"), alignSelf: 'center', height: heightToDp("5%"), borderRadius: 100 }}>
                                            <Text style={{ alignSelf: 'center', marginTop: heightToDp("0.5%"), fontWeight: '500', fontSize: widthToDp("5%"), fontFamily: 'Oswald-Medium' }}>{LanguageChange.signIn}</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <View style={{ flexDirection: 'row', alignSelf: 'center', marginTop: heightToDp('1.5%') }}>
                                        <Text style={{ fontFamily: 'Oswald-Medium' }}>{LanguageChange.noAccount}</Text>
                                        <TouchableOpacity onPress={() => this.navigateToRegistration()}>
                                            <Text style={{ color: BaseColor.Red, fontFamily: 'Oswald-Medium' }}> {LanguageChange.pleaseSignUp}</Text>
                                        </TouchableOpacity>
                                    </View>

                                    <View style={{ borderBottomColor: BaseColor.Stroke, borderBottomWidth: 1, marginTop: heightToDp('1.5%'), width: widthToDp("100%") }}></View>

                                    <TouchableOpacity onPress={() => this.guestSignIn()}>
                                        <View style={{ backgroundColor: BaseColor.SecondaryColor, marginTop: heightToDp("3%"), width: widthToDp("37%"), alignSelf: 'center', height: heightToDp("5%"), borderRadius: 100 }}>
                                            <Text style={{ alignSelf: 'center', marginTop: heightToDp("0.4%"), fontWeight: '500', fontSize: widthToDp("5%"), fontFamily: 'Oswald-Medium' }}>{LanguageChange.guestSignIn}</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <View style={{ marginTop: 20 }}></View>
                                </ScrollView>
                            </View>
                    }
                </View>
            </KeyboardAwareScrollView>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    labelInput: {
        color: '#000',
        fontSize: widthToDp("4.6%"),
        fontFamily: 'Oswald-Medium'
    },
    formInput: {
        borderBottomWidth: 1.5,
        borderColor: '#333',
        width: widthToDp("80%")
    },
    input: {
        borderWidth: 0,
        height: heightToDp("6%"),
        fontSize: widthToDp("5%"),
        fontFamily: 'Oswald-Light'
    }
});