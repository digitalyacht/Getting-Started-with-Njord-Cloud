# Viam Cloud Information

The Njord Cloud is built on Viam Cloud Technology and this readme provides additional information on how to navigate around the Viam Cloud Dashboard.

When you register for the [Viam Cloud](https://app.viam.com/robots) you will create an Organisation called Digital Yacht, which has no boats (locations) in it. If you wish to play with a real NjordLink device, either connected to a boat's network or on a simulated NMEA 2000 network in the lab, then you should contact sales@digitalyacht.co.uk to order a NjordLink+ device - special discounts are available to developers.

Alternatively, you can play with our demo NjordLink+ device that is on a simulated boat "Njord Wind", sailing around Miami. Simply submit a Developer Request form ([click here](https://support.digitalyacht.co.uk/developer-request/) ). Please note that you must submit the same email address as you used to register for your Viam Account. One of our engineers will then grant you access to our DY-Demo organisation and supply you with a .env file that has the API keys required to access NjordLink+ unit (machine).

## The Viam Cloud Dashboard

When you login to the Viam Cloud you will see a screen similar to the one below, showing either your NjordLink machine or the DY-Demo organisation's machines... 

<div align="center">
<img src="https://github.com/digitalyacht/Getting-Started-with-Njord-Cloud/blob/eb34853d4a04226041400552845ffd01d663c74b/images/DYDemo_dashboard.png" width=70%>
</div>

If you click on the machine you wish to look at, in this example Njord Wind, you will be taken to the Configuration page for that machine...

<div align="center">
<img src="https://github.com/digitalyacht/Getting-Started-with-Njord-Cloud/blob/074997f87349d77d6b2c5aaa0ef55a838c2a71e6/images/DYDemo_NjordWind_Configure.png" width=70%>
</div>

All of the configuration is pretty automatic and there is nothing that normally needs to be changed, so click on the Control tab and you will see what data the Njord Wind is transmitting...

<div align="center">
<img src="https://github.com/digitalyacht/Getting-Started-with-Njord-Cloud/blob/074997f87349d77d6b2c5aaa0ef55a838c2a71e6/images/DYDemo_NjordWind_Control.png" width=70%>
</div>

If you wish to remotely send a PGN on the Njord Wind's NMEA 2000 network, you can create a transmission in the Sender section. Create the PGN contents in the Input panel and then when you click the Execute button, you should see a positive "sent" : true message in the Output panel... 

<div align="center">
<img src="https://github.com/digitalyacht/Getting-Started-with-Njord-Cloud/blob/074997f87349d77d6b2c5aaa0ef55a838c2a71e6/images/DYDemo_NjordWind_Sender.png" width=70%>
</div>
