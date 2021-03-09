import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Text, View } from 'react-native';
import LanguageScreen from './Pages/LanguageScreen'
import RegistrationScreen from './Pages/RegistrationScreen'
import SigninScreen from './Pages/SigninScreen'
import DashBoardScreen from './Pages/DashBoardScreen'
import NotificationsScreen from './Pages/NotificationsScreen'
import NotificationDetailsScreen from './Pages/NotificationDetailsScreen'
import KnowledgeCenterScreen from './Pages/KnowledgeCenterScreen'
import CropsScreen from './Pages/CropsScreen'
import LandTypeScreen from './Pages/LandTypeScreen'
import AnalysisScreen from './Pages/AnalysisScreen'
import StepOneScreen from './Pages/StepOneScreen'
import StepTwoScreen from './Pages/StepTwoScreen'
import StepThreeScreen from './Pages/StepThreeScreen'
import StepFourScreen from './Pages/StepFourScreen'
import StepFiveScreen from './Pages/StepFiveScreen'
import StepSixScreen from './Pages/StepSixScreen'
import StepSevenScreen from './Pages/StepSevenScreen'
import StepEightScreen from './Pages/StepEightScreen'
import ActualCultivationCostScreen from './Pages/ActualCultivationCostScreen'
import CostBenifitAnalysisScreen from './Pages/CostBenifitAnalysisScreen'
import LiveStockScreen from './Pages/LiveStockScreen'
import IncomeScreen from './Pages/IncomeScreen'
import GeneralSettingsScreen from './Pages/GeneralSettingsScreen'
import BreedScreen from './Pages/BreedScreen'
import SelectFarmingAreaScreen from './Pages/SelectFarmingAreaScreen'
import ImportantLinksSubCategoryScreen from './Pages/ImportantLinksSubCategoryScreen'
import ImportantLinksScreen from './Pages/ImportantLinksScreen'
import BreedDescriptionScreen from './Pages/BreedDescriptionScreen'
import PatchScreen from './Pages/PatchScreen'
import LiveStockEnterQuantityScreen from './Pages/LiveStockEnterQuantityScreen'
import LiveStockExpectedProfitAnalysisScreen from './Pages/LiveStockExpectedProfitAnalysisScreen'
import ImportantLinksDetailsScreen from './Pages/ImportantLinksDetailsScreen'
import NutritionGardenScreen from './Pages/NutritionGardenScreen'
import NutritionGardenDetailsScreen from './Pages/NutritionGardenDetailsScreen'
import LiveStockStepTwoScreen from './Pages/LiveStockStepTwoScreen'
import LiveStockStepThreeScreen from './Pages/LiveStockStepThreeScreen'
import BreedNewScreen from './Pages/BreedNewScreen'
import LivestockTableScreen from './Pages/LivestockTableScreen'

const Stack = createStackNavigator();

function AppStack(){
    return(
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="LanguageScreen" component={LanguageScreen}/>
                <Stack.Screen name="RegistrationScreen" component={RegistrationScreen}/>
                <Stack.Screen name="SigninScreen" component={SigninScreen}/>
                <Stack.Screen name="DashBoardScreen" component={DashBoardScreen}/>
                <Stack.Screen name="NotificationsScreen" component={NotificationsScreen}/>
                <Stack.Screen name="NotificationDetailsScreen" component={NotificationDetailsScreen}/>
                <Stack.Screen name="KnowledgeCenterScreen" component={KnowledgeCenterScreen}/>
                <Stack.Screen name="CropsScreen" component={CropsScreen}/>
                <Stack.Screen name="LandTypeScreen" component={LandTypeScreen}/>
                <Stack.Screen name="AnalysisScreen" component={AnalysisScreen}/>
                <Stack.Screen name="StepOneScreen" component={StepOneScreen}/>
                <Stack.Screen name="StepTwoScreen" component={StepTwoScreen}/>
                <Stack.Screen name="StepThreeScreen" component={StepThreeScreen}/>
                <Stack.Screen name="StepFourScreen" component={StepFourScreen}/>
                <Stack.Screen name="StepFiveScreen" component={StepFiveScreen}/>
                <Stack.Screen name="StepSixScreen" component={StepSixScreen}/>
                <Stack.Screen name="StepSevenScreen" component={StepSevenScreen}/>
                <Stack.Screen name="StepEightScreen" component={StepEightScreen}/>
                <Stack.Screen name="ActualCultivationCostScreen" component={ActualCultivationCostScreen}/>
                <Stack.Screen name="CostBenifitAnalysisScreen" component={CostBenifitAnalysisScreen}/>
                <Stack.Screen name="LiveStockScreen" component={LiveStockScreen}/>
                <Stack.Screen name="IncomeScreen" component={IncomeScreen} />
                <Stack.Screen name="GeneralSettingsScreen" component={GeneralSettingsScreen}/>
                <Stack.Screen name="BreedScreen" component={BreedScreen}/>
                <Stack.Screen name="SelectFarmingAreaScreen" component={SelectFarmingAreaScreen}/>
                <Stack.Screen name="ImportantLinksScreen" component={ImportantLinksScreen}/>
                <Stack.Screen name="ImportantLinksSubCategoryScreen" component={ImportantLinksSubCategoryScreen}/>
                <Stack.Screen name="BreedDescriptionScreen" component={BreedDescriptionScreen}/>
                <Stack.Screen name="PatchScreen" component={PatchScreen}/>
                <Stack.Screen name="LiveStockEnterQuantityScreen" component={LiveStockEnterQuantityScreen}/>
                <Stack.Screen name="LiveStockExpectedProfitAnalysisScreen" component={LiveStockExpectedProfitAnalysisScreen}/>
                <Stack.Screen name="ImportantLinksDetailsScreen" component={ImportantLinksDetailsScreen}/>
                <Stack.Screen name="NutritionGardenScreen" component={NutritionGardenScreen}/>
                <Stack.Screen name="NutritionGardenDetailsScreen" component={NutritionGardenDetailsScreen}/>
                <Stack.Screen name="LiveStockStepTwoScreen" component={LiveStockStepTwoScreen}/>
                <Stack.Screen name="LiveStockStepThreeScreen" component={LiveStockStepThreeScreen}/>
                <Stack.Screen name="BreedNewScreen" component={BreedNewScreen}/>
                <Stack.Screen name="LivestockTableScreen" component={LivestockTableScreen}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default AppStack;