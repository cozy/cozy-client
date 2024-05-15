// https://gist.github.com/incredimike/1469814

/**
 * List of countries with their ISO codes
 *
 * @constant
 * @type {import('../../types').CountryISO[]}
 */
export const COUNTRIES_ISO = [
  { code2: 'AF', code3: 'AFG', name: 'Afghanistan', number: '004' },
  { code2: 'AL', code3: 'ALB', name: 'Albania', number: '008' },
  { code2: 'DZ', code3: 'DZA', name: 'Algeria', number: '012' },
  { code2: 'AS', code3: 'ASM', name: 'American Samoa', number: '016' },
  { code2: 'AD', code3: 'AND', name: 'Andorra', number: '020' },
  { code2: 'AO', code3: 'AGO', name: 'Angola', number: '024' },
  { code2: 'AI', code3: 'AIA', name: 'Anguilla', number: '660' },
  { code2: 'AQ', code3: 'ATA', name: 'Antarctica', number: '010' },
  { code2: 'AG', code3: 'ATG', name: 'Antigua and Barbuda', number: '028' },
  { code2: 'AR', code3: 'ARG', name: 'Argentina', number: '032' },
  { code2: 'AM', code3: 'ARM', name: 'Armenia', number: '051' },
  { code2: 'AW', code3: 'ABW', name: 'Aruba', number: '533' },
  { code2: 'AU', code3: 'AUS', name: 'Australia', number: '036' },
  { code2: 'AT', code3: 'AUT', name: 'Austria', number: '040' },
  { code2: 'AZ', code3: 'AZE', name: 'Azerbaijan', number: '031' },
  { code2: 'BS', code3: 'BHS', name: 'Bahamas (the)', number: '044' },
  { code2: 'BH', code3: 'BHR', name: 'Bahrain', number: '048' },
  { code2: 'BD', code3: 'BGD', name: 'Bangladesh', number: '050' },
  { code2: 'BB', code3: 'BRB', name: 'Barbados', number: '052' },
  { code2: 'BY', code3: 'BLR', name: 'Belarus', number: '112' },
  { code2: 'BE', code3: 'BEL', name: 'Belgium', number: '056' },
  { code2: 'BZ', code3: 'BLZ', name: 'Belize', number: '084' },
  { code2: 'BJ', code3: 'BEN', name: 'Benin', number: '204' },
  { code2: 'BM', code3: 'BMU', name: 'Bermuda', number: '060' },
  { code2: 'BT', code3: 'BTN', name: 'Bhutan', number: '064' },
  {
    code2: 'BO',
    code3: 'BOL',
    name: 'Bolivia (Plurinational State of)',
    number: '068'
  },
  {
    code2: 'BQ',
    code3: 'BES',
    name: 'Bonaire, Sint Eustatius and Saba',
    number: '535'
  },
  { code2: 'BA', code3: 'BIH', name: 'Bosnia and Herzegovina', number: '070' },
  { code2: 'BW', code3: 'BWA', name: 'Botswana', number: '072' },
  { code2: 'BV', code3: 'BVT', name: 'Bouvet Island', number: '074' },
  { code2: 'BR', code3: 'BRA', name: 'Brazil', number: '076' },
  {
    code2: 'IO',
    code3: 'IOT',
    name: 'British Indian Ocean Territory (the)',
    number: '086'
  },
  { code2: 'BN', code3: 'BRN', name: 'Brunei Darussalam', number: '096' },
  { code2: 'BG', code3: 'BGR', name: 'Bulgaria', number: '100' },
  { code2: 'BF', code3: 'BFA', name: 'Burkina Faso', number: '854' },
  { code2: 'BI', code3: 'BDI', name: 'Burundi', number: '108' },
  { code2: 'CV', code3: 'CPV', name: 'Cabo Verde', number: '132' },
  { code2: 'KH', code3: 'KHM', name: 'Cambodia', number: '116' },
  { code2: 'CM', code3: 'CMR', name: 'Cameroon', number: '120' },
  { code2: 'CA', code3: 'CAN', name: 'Canada', number: '124' },
  { code2: 'KY', code3: 'CYM', name: 'Cayman Islands (the)', number: '136' },
  {
    code2: 'CF',
    code3: 'CAF',
    name: 'Central African Republic (the)',
    number: '140'
  },
  { code2: 'TD', code3: 'TCD', name: 'Chad', number: '148' },
  { code2: 'CL', code3: 'CHL', name: 'Chile', number: '152' },
  { code2: 'CN', code3: 'CHN', name: 'China', number: '156' },
  { code2: 'CX', code3: 'CXR', name: 'Christmas Island', number: '162' },
  {
    code2: 'CC',
    code3: 'CCK',
    name: 'Cocos (Keeling) Islands (the)',
    number: '166'
  },
  { code2: 'CO', code3: 'COL', name: 'Colombia', number: '170' },
  { code2: 'KM', code3: 'COM', name: 'Comoros (the)', number: '174' },
  {
    code2: 'CD',
    code3: 'COD',
    name: 'Congo (the Democratic Republic of the)',
    number: '180'
  },
  { code2: 'CG', code3: 'COG', name: 'Congo (the)', number: '178' },
  { code2: 'CK', code3: 'COK', name: 'Cook Islands (the)', number: '184' },
  { code2: 'CR', code3: 'CRI', name: 'Costa Rica', number: '188' },
  { code2: 'HR', code3: 'HRV', name: 'Croatia', number: '191' },
  { code2: 'CU', code3: 'CUB', name: 'Cuba', number: '192' },
  { code2: 'CW', code3: 'CUW', name: 'Curaçao', number: '531' },
  { code2: 'CY', code3: 'CYP', name: 'Cyprus', number: '196' },
  { code2: 'CZ', code3: 'CZE', name: 'Czechia', number: '203' },
  { code2: 'CI', code3: 'CIV', name: "Côte d'Ivoire", number: '384' },
  { code2: 'DK', code3: 'DNK', name: 'Denmark', number: '208' },
  { code2: 'DJ', code3: 'DJI', name: 'Djibouti', number: '262' },
  { code2: 'DM', code3: 'DMA', name: 'Dominica', number: '212' },
  {
    code2: 'DO',
    code3: 'DOM',
    name: 'Dominican Republic (the)',
    number: '214'
  },
  { code2: 'EC', code3: 'ECU', name: 'Ecuador', number: '218' },
  { code2: 'EG', code3: 'EGY', name: 'Egypt', number: '818' },
  { code2: 'SV', code3: 'SLV', name: 'El Salvador', number: '222' },
  { code2: 'GQ', code3: 'GNQ', name: 'Equatorial Guinea', number: '226' },
  { code2: 'ER', code3: 'ERI', name: 'Eritrea', number: '232' },
  { code2: 'EE', code3: 'EST', name: 'Estonia', number: '233' },
  { code2: 'SZ', code3: 'SWZ', name: 'Eswatini', number: '748' },
  { code2: 'ET', code3: 'ETH', name: 'Ethiopia', number: '231' },
  {
    code2: 'FK',
    code3: 'FLK',
    name: 'Falkland Islands (the) [Malvinas]',
    number: '238'
  },
  { code2: 'FO', code3: 'FRO', name: 'Faroe Islands (the)', number: '234' },
  { code2: 'FJ', code3: 'FJI', name: 'Fiji', number: '242' },
  { code2: 'FI', code3: 'FIN', name: 'Finland', number: '246' },
  { code2: 'FR', code3: 'FRA', name: 'France', number: '250' },
  { code2: 'GF', code3: 'GUF', name: 'French Guiana', number: '254' },
  { code2: 'PF', code3: 'PYF', name: 'French Polynesia', number: '258' },
  {
    code2: 'TF',
    code3: 'ATF',
    name: 'French Southern Territories (the)',
    number: '260'
  },
  { code2: 'GA', code3: 'GAB', name: 'Gabon', number: '266' },
  { code2: 'GM', code3: 'GMB', name: 'Gambia (the)', number: '270' },
  { code2: 'GE', code3: 'GEO', name: 'Georgia', number: '268' },
  { code2: 'DE', code3: 'DEU', name: 'Germany', number: '276' },
  { code2: 'GH', code3: 'GHA', name: 'Ghana', number: '288' },
  { code2: 'GI', code3: 'GIB', name: 'Gibraltar', number: '292' },
  { code2: 'GR', code3: 'GRC', name: 'Greece', number: '300' },
  { code2: 'GL', code3: 'GRL', name: 'Greenland', number: '304' },
  { code2: 'GD', code3: 'GRD', name: 'Grenada', number: '308' },
  { code2: 'GP', code3: 'GLP', name: 'Guadeloupe', number: '312' },
  { code2: 'GU', code3: 'GUM', name: 'Guam', number: '316' },
  { code2: 'GT', code3: 'GTM', name: 'Guatemala', number: '320' },
  { code2: 'GG', code3: 'GGY', name: 'Guernsey', number: '831' },
  { code2: 'GN', code3: 'GIN', name: 'Guinea', number: '324' },
  { code2: 'GW', code3: 'GNB', name: 'Guinea-Bissau', number: '624' },
  { code2: 'GY', code3: 'GUY', name: 'Guyana', number: '328' },
  { code2: 'HT', code3: 'HTI', name: 'Haiti', number: '332' },
  {
    code2: 'HM',
    code3: 'HMD',
    name: 'Heard Island and McDonald Islands',
    number: '334'
  },
  { code2: 'VA', code3: 'VAT', name: 'Holy See (the)', number: '336' },
  { code2: 'HN', code3: 'HND', name: 'Honduras', number: '340' },
  { code2: 'HK', code3: 'HKG', name: 'Hong Kong', number: '344' },
  { code2: 'HU', code3: 'HUN', name: 'Hungary', number: '348' },
  { code2: 'IS', code3: 'ISL', name: 'Iceland', number: '352' },
  { code2: 'IN', code3: 'IND', name: 'India', number: '356' },
  { code2: 'ID', code3: 'IDN', name: 'Indonesia', number: '360' },
  {
    code2: 'IR',
    code3: 'IRN',
    name: 'Iran (Islamic Republic of)',
    number: '364'
  },
  { code2: 'IQ', code3: 'IRQ', name: 'Iraq', number: '368' },
  { code2: 'IE', code3: 'IRL', name: 'Ireland', number: '372' },
  { code2: 'IM', code3: 'IMN', name: 'Isle of Man', number: '833' },
  { code2: 'IL', code3: 'ISR', name: 'Israel', number: '376' },
  { code2: 'IT', code3: 'ITA', name: 'Italy', number: '380' },
  { code2: 'JM', code3: 'JAM', name: 'Jamaica', number: '388' },
  { code2: 'JP', code3: 'JPN', name: 'Japan', number: '392' },
  { code2: 'JE', code3: 'JEY', name: 'Jersey', number: '832' },
  { code2: 'JO', code3: 'JOR', name: 'Jordan', number: '400' },
  { code2: 'KZ', code3: 'KAZ', name: 'Kazakhstan', number: '398' },
  { code2: 'KE', code3: 'KEN', name: 'Kenya', number: '404' },
  { code2: 'KI', code3: 'KIR', name: 'Kiribati', number: '296' },
  {
    code2: 'KP',
    code3: 'PRK',
    name: "Korea (the Democratic People's Republic of)",
    number: '408'
  },
  { code2: 'KR', code3: 'KOR', name: 'Korea (the Republic of)', number: '410' },
  { code2: 'KW', code3: 'KWT', name: 'Kuwait', number: '414' },
  { code2: 'KG', code3: 'KGZ', name: 'Kyrgyzstan', number: '417' },
  {
    code2: 'LA',
    code3: 'LAO',
    name: "Lao People's Democratic Republic (the)",
    number: '418'
  },
  { code2: 'LV', code3: 'LVA', name: 'Latvia', number: '428' },
  { code2: 'LB', code3: 'LBN', name: 'Lebanon', number: '422' },
  { code2: 'LS', code3: 'LSO', name: 'Lesotho', number: '426' },
  { code2: 'LR', code3: 'LBR', name: 'Liberia', number: '430' },
  { code2: 'LY', code3: 'LBY', name: 'Libya', number: '434' },
  { code2: 'LI', code3: 'LIE', name: 'Liechtenstein', number: '438' },
  { code2: 'LT', code3: 'LTU', name: 'Lithuania', number: '440' },
  { code2: 'LU', code3: 'LUX', name: 'Luxembourg', number: '442' },
  { code2: 'MO', code3: 'MAC', name: 'Macao', number: '446' },
  { code2: 'MG', code3: 'MDG', name: 'Madagascar', number: '450' },
  { code2: 'MW', code3: 'MWI', name: 'Malawi', number: '454' },
  { code2: 'MY', code3: 'MYS', name: 'Malaysia', number: '458' },
  { code2: 'MV', code3: 'MDV', name: 'Maldives', number: '462' },
  { code2: 'ML', code3: 'MLI', name: 'Mali', number: '466' },
  { code2: 'MT', code3: 'MLT', name: 'Malta', number: '470' },
  { code2: 'MH', code3: 'MHL', name: 'Marshall Islands (the)', number: '584' },
  { code2: 'MQ', code3: 'MTQ', name: 'Martinique', number: '474' },
  { code2: 'MR', code3: 'MRT', name: 'Mauritania', number: '478' },
  { code2: 'MU', code3: 'MUS', name: 'Mauritius', number: '480' },
  { code2: 'YT', code3: 'MYT', name: 'Mayotte', number: '175' },
  { code2: 'MX', code3: 'MEX', name: 'Mexico', number: '484' },
  {
    code2: 'FM',
    code3: 'FSM',
    name: 'Micronesia (Federated States of)',
    number: '583'
  },
  {
    code2: 'MD',
    code3: 'MDA',
    name: 'Moldova (the Republic of)',
    number: '498'
  },
  { code2: 'MC', code3: 'MCO', name: 'Monaco', number: '492' },
  { code2: 'MN', code3: 'MNG', name: 'Mongolia', number: '496' },
  { code2: 'ME', code3: 'MNE', name: 'Montenegro', number: '499' },
  { code2: 'MS', code3: 'MSR', name: 'Montserrat', number: '500' },
  { code2: 'MA', code3: 'MAR', name: 'Morocco', number: '504' },
  { code2: 'MZ', code3: 'MOZ', name: 'Mozambique', number: '508' },
  { code2: 'MM', code3: 'MMR', name: 'Myanmar', number: '104' },
  { code2: 'NA', code3: 'NAM', name: 'Namibia', number: '516' },
  { code2: 'NR', code3: 'NRU', name: 'Nauru', number: '520' },
  { code2: 'NP', code3: 'NPL', name: 'Nepal', number: '524' },
  { code2: 'NL', code3: 'NLD', name: 'Netherlands (the)', number: '528' },
  { code2: 'NC', code3: 'NCL', name: 'New Caledonia', number: '540' },
  { code2: 'NZ', code3: 'NZL', name: 'New Zealand', number: '554' },
  { code2: 'NI', code3: 'NIC', name: 'Nicaragua', number: '558' },
  { code2: 'NE', code3: 'NER', name: 'Niger (the)', number: '562' },
  { code2: 'NG', code3: 'NGA', name: 'Nigeria', number: '566' },
  { code2: 'NU', code3: 'NIU', name: 'Niue', number: '570' },
  { code2: 'NF', code3: 'NFK', name: 'Norfolk Island', number: '574' },
  {
    code2: 'MP',
    code3: 'MNP',
    name: 'Northern Mariana Islands (the)',
    number: '580'
  },
  { code2: 'NO', code3: 'NOR', name: 'Norway', number: '578' },
  { code2: 'OM', code3: 'OMN', name: 'Oman', number: '512' },
  { code2: 'PK', code3: 'PAK', name: 'Pakistan', number: '586' },
  { code2: 'PW', code3: 'PLW', name: 'Palau', number: '585' },
  { code2: 'PS', code3: 'PSE', name: 'Palestine, State of', number: '275' },
  { code2: 'PA', code3: 'PAN', name: 'Panama', number: '591' },
  { code2: 'PG', code3: 'PNG', name: 'Papua New Guinea', number: '598' },
  { code2: 'PY', code3: 'PRY', name: 'Paraguay', number: '600' },
  { code2: 'PE', code3: 'PER', name: 'Peru', number: '604' },
  { code2: 'PH', code3: 'PHL', name: 'Philippines (the)', number: '608' },
  { code2: 'PN', code3: 'PCN', name: 'Pitcairn', number: '612' },
  { code2: 'PL', code3: 'POL', name: 'Poland', number: '616' },
  { code2: 'PT', code3: 'PRT', name: 'Portugal', number: '620' },
  { code2: 'PR', code3: 'PRI', name: 'Puerto Rico', number: '630' },
  { code2: 'QA', code3: 'QAT', name: 'Qatar', number: '634' },
  {
    code2: 'MK',
    code3: 'MKD',
    name: 'Republic of North Macedonia',
    number: '807'
  },
  { code2: 'RO', code3: 'ROU', name: 'Romania', number: '642' },
  {
    code2: 'RU',
    code3: 'RUS',
    name: 'Russian Federation (the)',
    number: '643'
  },
  { code2: 'RW', code3: 'RWA', name: 'Rwanda', number: '646' },
  { code2: 'RE', code3: 'REU', name: 'Réunion', number: '638' },
  { code2: 'BL', code3: 'BLM', name: 'Saint Barthélemy', number: '652' },
  {
    code2: 'SH',
    code3: 'SHN',
    name: 'Saint Helena, Ascension and Tristan da Cunha',
    number: '654'
  },
  { code2: 'KN', code3: 'KNA', name: 'Saint Kitts and Nevis', number: '659' },
  { code2: 'LC', code3: 'LCA', name: 'Saint Lucia', number: '662' },
  {
    code2: 'MF',
    code3: 'MAF',
    name: 'Saint Martin (French part)',
    number: '663'
  },
  {
    code2: 'PM',
    code3: 'SPM',
    name: 'Saint Pierre and Miquelon',
    number: '666'
  },
  {
    code2: 'VC',
    code3: 'VCT',
    name: 'Saint Vincent and the Grenadines',
    number: '670'
  },
  { code2: 'WS', code3: 'WSM', name: 'Samoa', number: '882' },
  { code2: 'SM', code3: 'SMR', name: 'San Marino', number: '674' },
  { code2: 'ST', code3: 'STP', name: 'Sao Tome and Principe', number: '678' },
  { code2: 'SA', code3: 'SAU', name: 'Saudi Arabia', number: '682' },
  { code2: 'SN', code3: 'SEN', name: 'Senegal', number: '686' },
  { code2: 'RS', code3: 'SRB', name: 'Serbia', number: '688' },
  { code2: 'SC', code3: 'SYC', name: 'Seychelles', number: '690' },
  { code2: 'SL', code3: 'SLE', name: 'Sierra Leone', number: '694' },
  { code2: 'SG', code3: 'SGP', name: 'Singapore', number: '702' },
  {
    code2: 'SX',
    code3: 'SXM',
    name: 'Sint Maarten (Dutch part)',
    number: '534'
  },
  { code2: 'SK', code3: 'SVK', name: 'Slovakia', number: '703' },
  { code2: 'SI', code3: 'SVN', name: 'Slovenia', number: '705' },
  { code2: 'SB', code3: 'SLB', name: 'Solomon Islands', number: '090' },
  { code2: 'SO', code3: 'SOM', name: 'Somalia', number: '706' },
  { code2: 'ZA', code3: 'ZAF', name: 'South Africa', number: '710' },
  {
    code2: 'GS',
    code3: 'SGS',
    name: 'South Georgia and the South Sandwich Islands',
    number: '239'
  },
  { code2: 'SS', code3: 'SSD', name: 'South Sudan', number: '728' },
  { code2: 'ES', code3: 'ESP', name: 'Spain', number: '724' },
  { code2: 'LK', code3: 'LKA', name: 'Sri Lanka', number: '144' },
  { code2: 'SD', code3: 'SDN', name: 'Sudan (the)', number: '729' },
  { code2: 'SR', code3: 'SUR', name: 'Suriname', number: '740' },
  { code2: 'SJ', code3: 'SJM', name: 'Svalbard and Jan Mayen', number: '744' },
  { code2: 'SE', code3: 'SWE', name: 'Sweden', number: '752' },
  { code2: 'CH', code3: 'CHE', name: 'Switzerland', number: '756' },
  { code2: 'SY', code3: 'SYR', name: 'Syrian Arab Republic', number: '760' },
  { code2: 'TW', code3: 'TWN', name: 'Taiwan', number: '158' },
  { code2: 'TJ', code3: 'TJK', name: 'Tajikistan', number: '762' },
  {
    code2: 'TZ',
    code3: 'TZA',
    name: 'Tanzania, United Republic of',
    number: '834'
  },
  { code2: 'TH', code3: 'THA', name: 'Thailand', number: '764' },
  { code2: 'TL', code3: 'TLS', name: 'Timor-Leste', number: '626' },
  { code2: 'TG', code3: 'TGO', name: 'Togo', number: '768' },
  { code2: 'TK', code3: 'TKL', name: 'Tokelau', number: '772' },
  { code2: 'TO', code3: 'TON', name: 'Tonga', number: '776' },
  { code2: 'TT', code3: 'TTO', name: 'Trinidad and Tobago', number: '780' },
  { code2: 'TN', code3: 'TUN', name: 'Tunisia', number: '788' },
  { code2: 'TR', code3: 'TUR', name: 'Turkey', number: '792' },
  { code2: 'TM', code3: 'TKM', name: 'Turkmenistan', number: '795' },
  {
    code2: 'TC',
    code3: 'TCA',
    name: 'Turks and Caicos Islands (the)',
    number: '796'
  },
  { code2: 'TV', code3: 'TUV', name: 'Tuvalu', number: '798' },
  { code2: 'UG', code3: 'UGA', name: 'Uganda', number: '800' },
  { code2: 'UA', code3: 'UKR', name: 'Ukraine', number: '804' },
  {
    code2: 'AE',
    code3: 'ARE',
    name: 'United Arab Emirates (the)',
    number: '784'
  },
  {
    code2: 'GB',
    code3: 'GBR',
    name: 'United Kingdom of Great Britain and Northern Ireland (the)',
    number: '826'
  },
  {
    code2: 'UM',
    code3: 'UMI',
    name: 'United States Minor Outlying Islands (the)',
    number: '581'
  },
  {
    code2: 'US',
    code3: 'USA',
    name: 'United States of America (the)',
    number: '840'
  },
  { code2: 'UY', code3: 'URY', name: 'Uruguay', number: '858' },
  { code2: 'UZ', code3: 'UZB', name: 'Uzbekistan', number: '860' },
  { code2: 'VU', code3: 'VUT', name: 'Vanuatu', number: '548' },
  {
    code2: 'VE',
    code3: 'VEN',
    name: 'Venezuela (Bolivarian Republic of)',
    number: '862'
  },
  { code2: 'VN', code3: 'VNM', name: 'Viet Nam', number: '704' },
  {
    code2: 'VG',
    code3: 'VGB',
    name: 'Virgin Islands (British)',
    number: '092'
  },
  { code2: 'VI', code3: 'VIR', name: 'Virgin Islands (U.S.)', number: '850' },
  { code2: 'WF', code3: 'WLF', name: 'Wallis and Futuna', number: '876' },
  { code2: 'EH', code3: 'ESH', name: 'Western Sahara', number: '732' },
  { code2: 'YE', code3: 'YEM', name: 'Yemen', number: '887' },
  { code2: 'ZM', code3: 'ZMB', name: 'Zambia', number: '894' },
  { code2: 'ZW', code3: 'ZWE', name: 'Zimbabwe', number: '716' },
  { code2: 'AX', code3: 'ALA', name: 'Åland Islands', number: '248' }
]

/**
 * Check if a country code is valid
 *
 * @param {string} code - The country code
 * @returns {boolean} - True if the code is valid, false otherwise
 */
export const checkCountryCode = code => {
  if (!code) return false
  const codeUpperCase = code.toUpperCase()
  const foundCountry = COUNTRIES_ISO.find(
    country =>
      country.code2 === codeUpperCase || country.code3 === codeUpperCase
  )
  return !!foundCountry
}
