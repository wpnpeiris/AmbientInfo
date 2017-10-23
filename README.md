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

### System Overview
![N|Solid](system.png)

The main domain entities of the system are User’s Profile, Products, and Services. The Product itself can be IoTs or any standard thing with basic properties like manufacturer, model etc. The Services could be anything that user has subscribed with a provider.
All these domain entities act as the source of sense data for the system. Reading from user’s Profile, the system captures useful information of user’s age, language, city etc. From products, the system captures information like manufacture, type, model etc. If the product is an IoT, other useful information like user location and device specific data are also captured to show more insight of the product. In the same way, services provide information of the provider, service type, package etc to the system.
With all these sources of data, the system consolidates data further querying on public APIs. Then data classification with Machine learning algorithms (Sentimental Analysis and Collaborative filtering) are applied to meet user’s personalized features.

### System Context Features
#### Registered Products/Services
The user is provided with an option to enter his/her Product/Service details. Also, it may possible to auto detect user's newly purchase products/services. There are various possibilities to achieve this.
One option is to use transaction data of user’s Credit/Debit Cards with an integration of Bank or Financial institution's services. Using person transaction data, the application can build more knowledge of the user. It is possible to capture user’s frequently access shopping malls, type of purchases etc.
Another option is to access membership data of third parties. Most commercial entities provide with membership offers to improve their business. AmbientInfo can use (if possible) to capture these data to detect user’s product/services.
