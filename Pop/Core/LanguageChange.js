import LocalizedStrings from 'react-native-localization'

const LanguageChange = new LocalizedStrings({
    hi: {
        contactNumber : 'संपर्क संख्या',
        username : 'उपयोगकर्ता नाम',
        password: 'पारण शब्द',
        forgotPassword: 'पासवर्ड भूल गए',
        signIn: 'साइन इन करें',
        noAccount: 'आपका कोई खाता नहीं है?',
        pleaseSignUp:'कृपया साइन अप करो',
        guestSignIn: 'दोस्तों में साइन इन करें'
      },
      en: {
        signIn : 'SIGN IN',
        contactNumber : 'CONTACT NUMBER',
        username : 'USERNAME',
        password : 'PASSWORD',
        forgotPassword: 'FORGOT PASSWORD',
        noAccount : 'You dont have an account?',
        pleaseSignUp: 'Please Sign up',
        guestSignIn : 'GUEST SIGN IN'
      },
      od: {
          signIn:'ଚୁକ୍ତି କରିବା',
          contactNumber:'ଯୋଗାଯୋଗ ସଂଖ୍ୟା',
          username:'ଉପଯୋଗକର୍ତ୍ତା',
          password:'ପାସୱାର୍ଡ',
          forgotPassword:'ପାସୱାର୍ଡ଼ ଭୁଲି ଗଲେ କି',
          noAccount:'ଆପଣଙ୍କର ଏକ ଖାତା ନାହିଁ?',
          pleaseSignUp:'ଦୟାକରି ସାଇନ୍ ଅପ୍ କରନ୍ତୁ',
          guestSignIn:'ସର୍ବଶ୍ରେଷ୍ଠ ସାଇନ୍ ଇନ୍'
      }
})

export default LanguageChange