/*
valueKey - What key holds the value
labelKey - What key holds where the value is from (rarely used)
customLabelText - Used as a 3rd fallback from more customizable UI
labelUnit - The units of the value
*/

export const Pgns: Record<string, any[]> = {

    '126992': [ // System Time
        {
            valueKey: 'Time',
            labelKey: 'Source',
            customLabelText: null,
            labelUnit: null,
        }
    ],
    '127250': [ // Vessel Heading, free
        {
            valueKey: 'Heading',
            labelKey: null,
            customLabelText: null,
            labelUnit: '°',
        }
    ],

    '127257': [ // Atitude
        {
            valueKey: 'Pitch',
            labelKey: null,
            customLabelText: null,
            labelUnit: '°',
        },
        {
            valueKey: 'Roll',
            labelKey: null,
            customLabelText: null,
            labelUnit: '°',
        }
    ],

    '127258': [ // Engine Parameters, Rapid Update
        {
            valueKey: 'Variation',
            labelKey: 'Source',
            customLabelText: null,
            labelUnit: null,
        },
    ],

    '127488': [ // Magnetic Variation
        {
            valueKey: 'Boost Pressure',
            labelKey: null,
            customLabelText: null,
            labelUnit: 'Pa',
        },
        {
            valueKey: 'Speed',
            labelKey: null,
            customLabelText: null,
            labelUnit: 'RPM',
        },
        {
            valueKey: 'Tilt/Trim',
            labelKey: null,
            customLabelText: null,
            labelUnit: '%',
        },
    ],

    '127489': [ // Engine Parameters, Dynamic
        {
            valueKey: 'Alternator Potential',
            labelKey: null,
            customLabelText: null,
            labelUnit: 'V',
        },
        {
            valueKey: 'Coolant Pressure',
            labelKey: null,
            customLabelText: null,
            labelUnit: 'Pa',
        },
        {
            valueKey: 'Fuel Pressure',
            labelKey: null,
            customLabelText: null,
            labelUnit: 'Pa',
        },
        {
            valueKey: 'Oil pressure',
            labelKey: null,
            customLabelText: null,
            labelUnit: 'Pa',
        },
        {
            valueKey: 'Engine Load',
            labelKey: null,
            customLabelText: null,
            labelUnit: '%',
        },
        {
            valueKey: 'Engine Torque',
            labelKey: null,
            customLabelText: null,
            labelUnit: '%',
        },
        {
            valueKey: 'Oil temperature',
            labelKey: null,
            customLabelText: null,
            labelUnit: '°C',
        },
        {
            valueKey: 'Temperature',
            labelKey: null,
            customLabelText: null,
            labelUnit: '°C',
        },
        {
            valueKey: 'Total Engine hours',
            labelKey: null,
            customLabelText: null,
            labelUnit: null,
        },
    ],

    '127493': [ // Transmission Parameters, Dynamic
        {
            valueKey: 'Oil pressure',
            labelKey: null,
            customLabelText: null,
            labelUnit: 'Pa',
        },
        {
            valueKey: 'Oil temperature',
            labelKey: null,
            customLabelText: null,
            labelUnit: '°C',
        },
        {
            valueKey: 'Transmission Gear',
            labelKey: null,
            customLabelText: null,
            labelUnit: null,
        },
    ],

    '127506': [ // DC Detailed Status
        {
            valueKey: 'Remaining capacity',
            labelKey: null,
            customLabelText: null,
            labelUnit: null,
        },
        {
            valueKey: 'State of Charge',
            labelKey: null,
            customLabelText: null,
            labelUnit: null,
        },
    ],

    '127507': [ // Charger Status - DEPRECATED
        {
            valueKey: 'Voltage',
            labelKey: null,
            customLabelText: null,
            labelUnit: 'V',
        },
        {
            valueKey: 'Current',
            labelKey: null,
            customLabelText: null,
            labelUnit: 'A',
        },
    ],

    '127508': [ // Battery Status
        {
            valueKey: 'Enabled',
            labelKey: null,
            customLabelText: null,
            labelUnit: null,
        },
        {
            valueKey: 'Operating State',
            labelKey: null,
            customLabelText: null,
            labelUnit: null,
        },
    ],

    '127509': [ // Inverter Status - DEPRECATED
        {
            valueKey: 'AC Instance',
            labelKey: null,
            customLabelText: null,
            labelUnit: null,
        },
        {
            valueKey: 'DC Instance',
            labelKey: null,
            customLabelText: null,
            labelUnit: null,
        },
        {
            valueKey: 'Inverter Enable',
            labelKey: null,
            customLabelText: null,
            labelUnit: null,
        },
        {
            valueKey: 'Operating State',
            labelKey: null,
            customLabelText: null,
            labelUnit: null,
        },
    ],

    '127750': [ // Converter (Inverter/Charger) Status
        {
            valueKey: 'Connection Number',
            labelKey: null,
            customLabelText: null,
            labelUnit: null,
        },
        {
            valueKey: 'Operating State',
            labelKey: null,
            customLabelText: null,
            labelUnit: null,
        },
    ],

    '128006': [ // Thruster Control Status
        {
            valueKey: 'Azimuth Control',
            labelKey: null,
            customLabelText: null,
            labelUnit: null,
        },
        {
            valueKey: 'Direction Control',
            labelKey: null,
            customLabelText: null,
            labelUnit: null,
        },
        {
            valueKey: 'Power Enabled',
            labelKey: null,
            customLabelText: null,
            labelUnit: null,
        },
        {
            valueKey: 'Retract Control',
            labelKey: null,
            customLabelText: null,
            labelUnit: null,
        },
        {
            valueKey: 'Speed Control',
            labelKey: null,
            customLabelText: null,
            labelUnit: null,
        },
    ],

    '128259': [ // Thruster Control Status
        {
            valueKey: 'Speed Water Referenced',
            labelKey: null,
            customLabelText: null,
            labelUnit: 'Knots',
        },
    ],

    '128267': [ // Water Depth, free
        {
            valueKey: 'Depth',
            labelKey: null,
            customLabelText: null,
            labelUnit: 'm',
        },
    ],

    '128275': [ // Distance Log, free
        {
            valueKey: 'Log',
            labelKey: null,
            customLabelText: null,
            labelUnit: 'nauticle miles',
        },
    ],

    '129025': [ // Position, Rapid Update, free
        {
            valueKey: 'Latitude',
            labelKey: null,
            customLabelText: null,
            labelUnit: '°',
        },
        {
            valueKey: 'Longitude',
            labelKey: null,
            customLabelText: null,
            labelUnit: '°',
        },
    ],

    '129026': [ // COG & SOG, Rapid Update, free
        {
            valueKey: 'COG',
            labelKey: null,
            customLabelText: null,
            labelUnit: '°',
        },
        {
            valueKey: 'SOG',
            labelKey: null,
            customLabelText: null,
            labelUnit: 'Knots',
        },
    ],

    '129029': [ // GNSS Position Data
        {
            valueKey: 'Latitude',
            labelKey: null,
            customLabelText: null,
            labelUnit: '°',
        },
        {
            valueKey: 'Longitude',
            labelKey: null,
            customLabelText: null,
            labelUnit: '°',
        },
    ],

    '129044': [ // Datum
        {
            valueKey: 'Delta Altitude',
            labelKey: null,
            customLabelText: null,
            labelUnit: null,
        },
        {
            valueKey: 'Delta Latitude',
            labelKey: null,
            customLabelText: null,
            labelUnit: null,
        },
        {
            valueKey: 'Delta Longitude',
            labelKey: null,
            customLabelText: null,
            labelUnit: null,
        },
        {
            valueKey: 'Local Datum',
            labelKey: null,
            customLabelText: null,
            labelUnit: null,
        },
        {
            valueKey: 'Reference Datum',
            labelKey: null,
            customLabelText: null,
            labelUnit: null,
        },
    ],

    '130306': [ // Wind Data, free
        {
            valueKey: 'Wind Angle',
            labelKey: null,
            customLabelText: null,
            labelUnit: '°',
        },
        {
            valueKey: 'Wind Speed',
            labelKey: null,
            customLabelText: null,
            labelUnit: 'Knots',
        },
    ],

    '130312': [ // Temperature - DEPRECATED
        {
            valueKey: 'Actual Temperature',
            labelKey: 'Source',
            customLabelText: null,
            labelUnit: '°C',
        },
    ],

    '130313': [ // Humidity
        {
            valueKey: 'Actual Humidity',
            labelKey: 'Source',
            customLabelText: null,
            labelUnit: '%',
        },
    ],

    '130314': [ // Pressure
        {
            valueKey: 'Pressure',
            labelKey: 'Source',
            customLabelText: null,
            labelUnit: 'Pa',
        },
    ],

    '130316': [ // Temperature, Extended Range
        {
            valueKey: 'Temperature',
            labelKey: 'Source',
            customLabelText: null,
            labelUnit: '°C',
        },
    ],
}
