# Njord Cloud Developers Guide

The Njord Cloud is built on Viam Cloud Technology and allows developers to access a boat's real-time and historical NMEA 2000 data, stored in the Njord Cloud. Digital Yacht's NjordLink devices can be easily connected to a boat's NMEA 2000 and once configured will securely connect to the Viam Cloud servers, storing NMEA 2000 data for mobile and web apps to remotely access.

To evaluate the service, you will need to first register a free account on the [Viam Cloud](https://app.viam.com/robots) and then request access to the DY-Demo boat, by submitting a Developer Request form ([click here](https://support.digitalyacht.co.uk/developer-request/) ) Please note that you must submit the same email address as you used to register for your Viam Account.

To use the service with real devices and data, you will need to purchase one of the brand new NjordLink+ devices that are built on a RPi5. They locally decode the NMEA 2000 and securely send JSON data to the cloud. 

Please note that the original NjordLink (which is built on an ESP32) transmits RAW NMEA 2000 data and requires a developer to have knowledge of NMEA 2000 data (Appendix B) to query and display the data. We are working on a major update for NjordLink that will allow it to use the same JSON format as the Plus units and have one data format for all devices. If you wish to start development now, we strongly recommend that you develop for NjordLink+ and when NjordLink is updated your code will work with both devices. 

## Programming Language Options

Currently we have two example applications; one written in Python and one written in Type Script (see folders above).

By default, the Type Script application uses a MongoDB query to display the last five PGNs received, but working code is included for a SQL query, just commented out in the main.ts file. 

The Python application uses MongoDB, which is installed along with other dependencies when you install the Viam libraries.

Please follow the instructions in the relevant ReadMe.

[Early first image of NjordLink+](https://raw.githubusercontent.com/digitalyacht/Getting-Started-with-Njord-Cloud/refs/heads/main/images/NjordLink%2B_First_Image.jpg)
