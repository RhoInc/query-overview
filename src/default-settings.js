const settings = {
  //Addition settings for this template
  cutoff:10,
  alphabetize:false,   
  form_col:"form",
  field_col:"field",
  status_col:"status",
  filters:["markGroup","site"],
  filter_labels:["Marking Group: ","Site: "],
  groupBy:[null],

  //Standard webcharts settings
  "max_width":"1000",
  "y":{
    "type":"ordinal",
    "column":"Form",
    "label":" ",
    "sort":"total-descending",
  },
  "x":{
    "label":"# of Queries",
    "behavior":"flex"
  } ,
  "marks":[
    {
      "type":"bar",
      "per":[null],
      "split":null,
      "arrange":"stacked",
      "summarizeX":"count",
      "tooltip":null
    },
    {      
      "type":"text",
      "per":[null],
      "summarizeX":"count",
      "text":"$x",
      "attributes": {"dx": '0.25em', "dy":".25em"}
    }
  ],
  color_by:null,
  range_band:15,
  margin:{"right":"50"},
  legend:{location:"top"}
};

// Replicate settings in multiple places in the settings object
export function syncSettings(settings){
	settings.marks[0].per[0] = settings.form_col;
	settings.marks[1].per[0] = settings.form_col;
	settings.marks[0].tooltip = settings.status_col ? "["+settings.status_col+"] - $x queries" : "$x queries";
	settings.groupBy[0] = "FormField" //hard-coded variable derived in .on("init")
	settings.groupBy[1] = settings.form_col
	if(settings.status_col){
		settings.marks[0].split = settings.status_col
		settings.groupBy.push(settings.status_col)
	}
	if(settings.filters){
		settings.filters.forEach(function(d){
			settings.groupBy.push(d)
		})
	}
    return settings;
}

// Default Control objects
export const controlInputs = [ 
{type:"subsetter", value_col:null, label: "Form: "},

{ 
  type: "dropdown", 
  option: "y.column", 
  label: "Group By: ", 
  values: [null], 
  require: true
},
{
  type:"radio",
  option:"cutoff",
  label: "Show first N results",
  values: ["10", "25","All"], 
},
{type:"checkbox", option: 'alphabetize', label: 'Alphabetical? '}
];

// Map values from settings to control inputs
export function syncControlInputs(controlInputs, settings){
  var formControl = controlInputs.filter(function(d){return d.label=="Form: "})[0] 
  formControl.value_col = settings.form_col; 

  var yColControl = controlInputs.filter(function(d){return d.label=="Group By: "})[0]
  yColControl.values = settings.groupBy; 

  if(settings.status_col){
  	var statusControl = {
  		type:"subsetter", 
  		value_col:settings.status_col, 
  		label: "Status: ",
  		multiple:true
  	}
  	controlInputs.push(statusControl)
  }
  if(settings.filter){
  	settings.filter.forEach(function(d,i){
  		thisFilter = {
  			type:"subsetter", 
  			value_col:d, 
  			multiple:true
  		}
  		thisFilter.label = settings.filter_labels[i] ? settings.filter_labels[i] : null
  		controlInputs.push(thisFilter)
  	})
  }
  return controlInputs
}

export default settings
