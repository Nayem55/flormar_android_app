import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const PrivacyPolicyScreen = () => {
  return (
    <View style={styles.container}>
      <Image style={{width: "100%",height: 200,marginTop:18,marginBottom:25}} source={{uri:"https://flormarbd.com/wp-content/uploads/2023/02/2347-1536x1067.jpg"}}></Image>
      <Text style={styles.title}>Privacy Policy</Text>
      <ScrollView>
        <Text style={styles.title2}>WHAT WE COLLECT</Text>
        <Text style={styles.content}>
            1. We may collect the following information {'\n'}
            2. Name / Date of birth / Certificate. {'\n'}
            3. Contact information including email address & Mobile Number. {'\n'}
        </Text>
        <Text style={styles.title2}>WHAT WE DO WITH THE INFORMATION WE GATHER</Text>
        <Text style={styles.content}>
        We require this information to understand your needs and provide you with a better service, and  in particular for the following reasons: {'\n'}
        1. Internal record keeping. {'\n'}
        2. We may use the information to improve our products and services. {'\n'}
        3. We may periodically send promotional emails about new products, special offers or other information which we think you may find interesting using the email address which you have provided. {'\n'}
        4. From time to time, we may also use your information to contact you for market research  purposes. We may contact you by email, phone, fax or mail. We may use the information  to customize the website according to your interests. {'\n'}
        </Text>
        <Text style={styles.title2}>SECURITY</Text>
        <Text style={styles.content}>
            We are committed to ensuring that your information is secure. 
            In order to prevent unauthorized  access or disclosure, 
            we have put in place suitable physical, electronic and managerial procedures  
            to safeguard and secure the information we collect online.
        </Text>
        <Text style={styles.title2}>HOW WE USE COOKIES</Text>
        <Text style={styles.content}>
        A cookie is a small file which asks permission to be placed on your computers hard drive. Once  you agree, the file is added and the cookie helps analyze web traffic or lets you know when you  visit a particular site. Cookies allow web applications to respond to you as an individual. The web  application can tailor its operations to your needs, likes and dislikes by gathering and remembering  information about your preferences. {'\n'}

        We use traffic log cookies to identify which pages are being used. This helps us analyze data  about web page traffic and improve our website in order to tailor it to customer needs. We only  use this information for statistical analysis purposes and then the data is removed from the system. {'\n'}

        Overall, cookies help us provide you with a better website, by enabling us to monitor which pages  you find useful and which you do not. A cookie in no way gives us access to your computer or any  information about you, other than the data you choose to share with us. You can choose to accept  or decline cookies. Most web browsers automatically accept cookies, but you can usually modify  your browser setting to decline cookies if you prefer. This may prevent you from taking full  advantage of the website. {'\n'}
        </Text>
        <Text style={styles.title2}>LINKS TO OTHER WEBSITES</Text>
        <Text style={styles.content}>
        Our website may contain links to other websites of interest. However, once you have used these  links to leave our site, you should note that we do not have any control over that other website.  Therefore, we cannot be responsible for the protection and privacy of any information which you  provide whilst visiting such sites and such sites are not governed by this privacy statement. You  should exercise caution and look at the privacy statement applicable to the website in question.
        </Text>
        <Text style={styles.title2}>HOW LONG WE RETAIN YOUR DATA</Text>
        <Text style={styles.content}>
        If you leave a comment, the comment and its metadata are retained indefinitely. This is so we can recognize and approve any follow-up comments automatically instead of holding them in a moderation queue. {'\n'}

        For users that register on our website (if any), we also store the personal information they provide in their user profile. All users can see, edit, or delete their personal information at any time (except they cannot change their username). Website administrators can also see and edit that information.
        </Text>
        <Text style={styles.title2}>CONTROLLING YOUR PERSONAL INFORMATION</Text>
        <Text style={styles.content}>
        You may choose to restrict the collection or use of your personal information in the following  ways:

        Whenever you are asked to fill in a form on the website, look for the box that you can click to indicate that you do not want the information to be used by third Party for direct marketing & research purposes.
        If you have previously agreed with us using your personal information for direct marketing purposes, you have the right to change your mind at any time by letting us know using our Contact information.
        We will not sell, distribute or lease your personal information to third parties unless we have your  permission or are required by law to do so. We may use your personal information to send you  promotional information about third parties which we think you may find interesting if you tell us  that you wish this to happen. {'\n'}

        You may request details of personal information which we hold about you under the Data  Protection Act 1998. A small fee will be payable. If you would like a copy of the information held  on you please email us this request using our Contact Us information. {'\n'}

        If you believe that any information we are holding on you is incorrect or incomplete, please write  to or email us as soon as possible, at the above address. We will promptly correct any information  found to be incorrect.
        </Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
    textAlign: 'center'
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    color: '#666',
  },
  content: {
    fontSize: 16,
    marginBottom: 10,
    color: '#333',
    lineHeight: 24,
  },
  title2: {
    fontSize:16,
    color:'#ef4f85',
    marginBottom:5
  },
  
});

export default PrivacyPolicyScreen;
