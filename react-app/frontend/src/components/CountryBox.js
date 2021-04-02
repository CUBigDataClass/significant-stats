import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

export default function CountryBox(props) {

  function handleCountryChange(event,value) {
    // Here, we invoke the callback with the new value
    props.onChange(value);
}

  function boxSubmitHandler(event){
    event.preventDefault();
  }

  return (
    <Autocomplete
      id="country-box"
      options={countries}
      style={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Select Country" variant="outlined" />}
      onChange={handleCountryChange}
      onSubmit={boxSubmitHandler}
    />
  );
}

const countries = ['Bangladesh','Malaysia','Yemen','Christmas Island','Lesotho','Ecuador','Mauritius',
'Peru','South America',"Côte D'Ivoire","Tunisia","Anguilla","Spain",'Slovenia',"Senegal",'Austria',
'Kingman Reef','Gaza Strip','Turks And Caicas Islands','North Korea','New Caledonia','Somalia',
'British Virgin Islands','Seychelles','Libya','Israel','Europe','Andorra','Jordan','Sint Maarten',
'Ukraine','Uruguay','Svalbard And Jan Mayen','Netherlands (Europe)','Saudi Arabia','Kenya','Sierra Leone',
'Bhutan','Serbia','Djibouti','Egypt','Nicaragua','Aruba','Paraguay','Iran','French Polynesia','Denmark','Iraq',
'Romania','Guinea Bissau','Guatemala','El Salvador','Eritrea','Cameroon','Comoros','Guadeloupe','Liberia','Cyprus',
"Hong Kong",'Morocco','Mongolia','Portugal','Curaçao','Swaziland','Lebanon','Bahamas','United States','Madagascar',
'San Marino','Guyana','Bahrain','Denmark (Europe)','Saint Martin','Mali','Togo','Sri Lanka','Timor Leste','Bolivia',
'Canada','Antigua And Barbuda','Vietnam','Niger','Bonaire, Saint Eustatius And Saba','Macedonia','Tanzania','Oceania',
'Croatia','Liechtenstein','Africa','Moldova','Equatorial Guinea','Brazil','Martinique','Sudan','Georgia','Mauritania',
'Congo (Democratic Republic Of The)','Philippines','Ghana','Åland','Colombia','Turkmenistan','Ireland','Asia','Belgium',
'Samoa','Iceland','Sweden','Zambia','Guam','Dominican Republic','United Kingdom','Norway','United Kingdom (Europe)',
'Chile','Burkina Faso','Palau','Burma','Sao Tome And Principe','American Samoa','China','Kyrgyzstan','Malta',
'Greece','Saint Vincent And The Grenadines','Reunion','Saint Barthélemy','Costa Rica','Russia','Switzerland','Puerto Rico',
'Bulgaria','South Africa','Fiji','Syria','Uzbekistan','Venezuela','Armenia','Jersey','Greenland','Isle Of Man',
'Falkland Islands (Islas Malvinas)','Barbados','Kazakhstan','Papua New Guinea','Gambia','Cayman Islands',
'Palestina','Baker Island','South Georgia And The South Sandwich Isla','Guernsey','India','Bosnia And Herzegovina',
'Cape Verde','Thailand','Haiti','Estonia','Kuwait','Namibia','Northern Mariana Islands','Czech Republic',
'Faroe Islands','Palmyra Atoll','Heard Island And Mcdonald Islands','French Guiana','Dominica','Nepal',
'Taiwan','Algeria','Uganda','Laos','France','Trinidad And Tobago','Botswana','Finland','Honduras','Monaco',
'Guinea','France (Europe)','Tajikistan','Turkey','Angola','Niue','Suriname','Cuba','Jamaica','Montserrat',
'Indonesia','Netherlands','Mayotte',"Lithuania",'Luxembourg','Saint Kitts And Nevis','Mexico','Benin',
'Burundi','Germany','South Korea','Virgin Islands','Federated States Of Micronesia','French Southern And Antarctic Lands',
'Pakistan','Congo','Azerbaijan','Central African Republic','United Arab Emirates','Chad','Saint Lucia','Latvia',
'Western Sahara','Grenada','Qatar','Poland','Kiribati','Rwanda','Tonga','New Zealand','Solomon Islands','Japan',
'Belize','Montenegro','Slovakia','Mozambique','Albania','North America','Afghanistan','Zimbabwe','Belarus',
'Saint Pierre And Miquelon','Macau','Argentina','Nigeria','Ethiopia','Gabon','Australia','Malawi',
'Panama','Italy','Hungary','Singapore','Cambodia','Oman'

];
countries.sort()
