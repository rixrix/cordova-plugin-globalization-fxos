/*
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
 */

module.exports = {
    getPreferredLanguage: function(successCB, failureCB) {
        var lock = navigator.mozSettings.createLock(),
            setting = lock.get('language.current');

        setting.onsuccess = function() {
            successCB(setting.result);
        }

        setting.onerror = function() {
            failureCB(setting.error);
        }
    },

    getLocaleName:function(successCB, failureCB) {
        var locale = navigator.language || false;

        if (locale) {
            successCB(locale);
        } else {
            failureCB(false);
        }
    },

    dateToString: function(date, successCB, errorCB, options) {
        try {
            var formattedDate,
                date = date.valueOf();

            if (options instanceof Object != false) {
                if (typeof options['formatLength'] != 'undefined') {
                    switch(options['formatLength']) {
                        case 'short':
                            formattedDate = date.getMonth() + '/' + date.getDay() + '/' + date.getFullYear().toString().substr(2,2);
                            break;
                    }
                }
            }
            successCB(formattedDate);
        } catch (e) {
            errorCB(e.message);
        }
    },

    stringToDate: function(dateString, successCB, errorCB, options) {
        var date = {};

        if (Date.parse(dateString)) {
            date = {
                month: dateString.getMonth(),
                day: dateString.getDay(),
                year: dateString.getFullYear()
            }
            successCB(date);
        } else {
            errorCB('Error gettting date');
        }
    },

    getFirstDayOfWeek: function(successCB, errorCB) {
        var firstDayOfWeek,
            currentDate = new Date();

        firstDayOfWeek = new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay()));

        if (firstDayOfWeek) {
            successCB({value: firstDayOfWeek.getDay()});
        } else {
            errorCB("Error getting day");
        }
    },

    numberToString: function(number, successCB, errorCB, options) {
        var options = options || {type: 'decimal'};

        number = Number(number);
        if (number && !isNaN(number)) {
            switch(options.type) {
                case 'decimal':
                    successCB({'value': number.toFixed(2)});
                    break;
            }
        } else {
            errorCB("Unable to format");
        }

    }
};