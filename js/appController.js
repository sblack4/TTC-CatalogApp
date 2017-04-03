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
            , locked: false
            , image: 'images/level1.png'
            , description: 'Your application is successfully deployed, welcome to the cloud'
            , required: 'Complete Lab 100 to unlock'
        };
        self.level2 = {
            name: 'Level 2'
            , locked: false
            , image: 'images/level2.png'
            , description: 'I detect a microservice, now if only I had data'
            , required: 'Complete Lab 200 to unlock'
        };
        self.level3 = {
            name: 'Level 3'
            , locked: false
            , image: 'images/level3.png'
            , description: 'WooHoo, we have database records'
            , required: 'Complete Lab 300 to unlock'
        };
        self.level4 = {
            name: 'Level 4'
            , locked: false
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
        //        self.catalogDescription = 'No Microservice Detected, complete Lab 200 to enable Catalog';
        //                self.catalogDescription = 'Catalog Connected but no data is detected, complete Lab 300 to fill Catalog'
        self.catalogDescription = 'Catalog'
        self.selectedConversion = ko.observable(1.0);
        self.selectedPrefix = ko.observable('$');
        self.selectedPostfix = ko.observable(' USD');
        self.addConvertedPrice = function (symbol, conversionFromUSD, postfix) {
            self.catalogItems.forEach(function (item, index) {
                item.convertedPrice = ko.computed(function () {
                    return self.selectedPrefix() + parseFloat(Math.round((item.price() * self.selectedConversion()) * 100) / 100).toFixed(2) + self.selectedPostfix();
                }, this);
            });
        };
        //Lab 300
        self.catalogItems = [];
        self.catalogItems = [
            {
                name: 'Test Item'
                , image: 'data:image/png;base64,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'
                , price: ko.observable(5.00)
                    }
                ];
        //LAB 400
        self.addConvertedPrice('$', 1.0, ' USD');
        //        self.currencyDisabled = true;
        self.currencyDisabled = false;
        self.currencyLabel = "No Currency Microservice Detected, complete Lab 400 to unlock";
        self.currencyLabel = "Select Currency"
        self.currencies = [{
            postfix: ' USD'
            , prefix: '$'
            , name: 'USD'
            , fromUSD: 1.0
        }, {
            postfix: ' CAD'
            , prefix: '$'
            , name: 'CAD'
            , fromUSD: 1.34
        }];
        this.currencyChangeHandler = function (event, data) {
            if (data.option == "value") {
                var currency = self.currencies[data.value[0]];
                self.selectedConversion(currency.fromUSD);
                self.selectedPrefix(currency.prefix);
                self.selectedPostfix(currency.postfix);
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