# AmbientInfo
The attempt of this work is to build the concept of a smart system that perceives user’s preferences and activities toward the use of publicly available services and user’s own device information to provide a novel interface of services.

The context for the application consists of personalized recommended features that evolve continuous learning from its environment and other users.

 * Usage and Troubleshooting Tips: 
  The application captures registered products/services and recommends Usage/Troubleshooting Tips crawling over public content  service APIs, e.g Youtube, Google.
  
 * Recommend Products/Services: 
   TThe application may find users with similar preferences and recommend each other's products/services.

 * Around You: 
   The application read the current location of the users and provides with places that may user find useful around him.
   
 * Insight of Product/Service:
   The application reads tweets from the Twitter API and does a Sentiment Analysis of user’s products/services. Also derived information from Services and IoT data.
 
 * Sales Promotions:
 The application can expose a service API to business parties to publish their sales promotions, but the application will show only the relevances for the user.


The main entities that classify the application context are user’s own products and services. The advantage of this classification model is, the user’s own products may represent Internet of Things (IoT), e.g Smartphones/tablets, Smart-tv, Vehicle with smart devices etc. Also, most of the services these days open with RESTful/SOAP APIs (Internet of Services) to get the detail of their service usage.
Together with input from user’s profile and products/services, AmbientInfo queries on publicly available APIs and classify data using machine learning algorithms to provide more personalized features.

## System Overview
