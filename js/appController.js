/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your application specific code will go here
 */
define(['ojs/ojcore', 'knockout', 'ojs/ojknockout', 'ojs/ojmasonrylayout', 'ojs/ojselectcombobox', 'jquery'], function (oj, ko) {
    function ControllerViewModel() {
        var self = this;
        // Media queries for repsonsive layouts
        var smQuery = oj.ResponsiveUtils.getFrameworkQuery(oj.ResponsiveUtils.FRAMEWORK_QUERY_KEY.SM_ONLY);
        self.smScreen = oj.ResponsiveKnockoutUtils.createMediaQueryObservable(smQuery);
        // Header
        // Application Name used in Branding Area
        self.appName = ko.observable("App Name");
        self.appName("Catalog Application");
        //Achivements
        self.level1 = {
            name: 'Level 1'
            , locked: ko.observable(false)
            , image: 'images/level1.png'
            , description: 'Your application is successfully deployed, welcome to the cloud'
            , required: 'Complete Lab 100 to unlock'
        };
        self.level2 = {
            name: 'Level 2'
            , locked: ko.observable(true)
            , image: 'images/level2.png'
            , description: 'I detect a microservice, now if only I had data'
            , required: 'Complete Lab 200 to unlock'
        };
        self.level3 = {
            name: 'Level 3'
            , locked: ko.observable(true)
            , image: 'images/level3.png'
            , description: 'WooHoo, we have database records'
            , required: 'Complete Lab 300 to unlock'
        };
        self.level4 = {
            name: 'Level 4'
            , locked: ko.observable(true)
            , image: 'images/level4.png'
            , description: 'It\'s all coming together, you are now a master of cloud deployments'
            , required: 'Complete Lab 400 to unlock'
        };
        self.achievements = [
            self.level1
            , self.level2
            , self.level3
            , self.level4
        ];
        //        LAB 200
        self.catalogDescription = ko.observable('No Catalog Microservice Detected, complete Lab 200 to unlock');
        //Lab 300
        self.catalogItems = ko.observableArray();
        $.getJSON("/catalog", function(data) { 
            console.log(data);
            if(data != null){
                if(data.length == 0){
                    self.catalogDescription('Catalog Connected but no data is detected, complete Lab 300 to fill Catalog');
                    self.level2.locked(false);
                }
                else{
                    self.catalogDescription('Catalog');
                    for(var i = 0; i < data.length; i++){
                        self.catalogItems.push({
                            name:data[i].name,
                            image:data[i].image,
                            description:data[i].description,
                            price: data[i].price,
                            convertedPrice: ko.observable('$' + parseFloat(Math.round((data[i].price) * 100) / 100).toFixed(2) + ' USD')
                        });
                    }
                    self.level2.locked(false);
                    self.level3.locked(false);
                    $("#catalogMasonryLayout").ojMasonryLayout("refresh");
                }
            }
            
        });
        //LAB 400
        self.currencyDisabled = ko.observable(true);
        self.currencyLabel = ko.observable('No Currency Microservice Detected, complete Lab 400 to unlock');
        self.currencies = ko.observableArray([{
                        postfix:' USD',
                        prefix:'$',
                        name:'USD',
                        fromUSD: 1
                    }]);
        $.getJSON("/currencyExchange", function(data) { 
            console.log("Currency Data",data,"length",data.length);
            if(data != null){
                if(data.length > 0){
                    console.log('Loading Currencies');
                    self.currencyLabel("Select Currency");
                    for(var i = 0; i < data.length; i++){
                        self.currencies.push({
                            postfix: data[i].postfix,
                            prefix: data[i].prefix,
                            name: data[i].name,
                            fromUSD: data[i].fromUSD
                        });
                    }
                    self.currencyDisabled(false);
                    self.level4.locked(false);
                }
            }
        });
        this.currencyChangeHandler = function (event, data) {
            if (data.option == "value") {
                console.log("Data",data,data.value[0]);
                var currency = self.currencies()[data.value[0]];
                console.log("Currency Selected",currency);
                $.each(self.catalogItems(), function(index, item){
                    item.convertedPrice(currency.prefix + ' ' + parseFloat(Math.round((item.price * currency.fromUSD) * 100) / 100).toFixed(2) + ' ' + currency.postfix);
                });
            }
        };
        // Footer
        function footerLink(name, id, linkTarget) {
            this.name = name;
            this.linkId = id;
            this.linkTarget = linkTarget;
        }
        self.footerLinks = ko.observableArray([
        new footerLink('About Oracle', 'aboutOracle', 'http://www.oracle.com/us/corporate/index.html#menu-about')
        , new footerLink('Contact Us', 'contactUs', 'http://www.oracle.com/us/corporate/contact/index.html')
        , new footerLink('Legal Notices', 'legalNotices', 'http://www.oracle.com/us/legal/index.html')
        , new footerLink('Terms Of Use', 'termsOfUse', 'http://www.oracle.com/us/legal/terms/index.html')
        , new footerLink('Your Privacy Rights', 'yourPrivacyRights', 'http://www.oracle.com/us/legal/privacy/index.html')
      ]);
    }
    return new ControllerViewModel();
});