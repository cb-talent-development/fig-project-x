
//config file
var config={
    "production":false,
    "timeAnim":600,
    /*LOCALY GROWN PART */
    "step":100,
    "step_counties":250,
    "technologiesList":[
    {
        "id":1,
        "Name":"Knockout js",
        "Description":"The ability to generate or use different sets of rules for combining or grouping things in different ways"
    },
    {
        "id":2,
        "Name":"Laravel",
        "Description":"The ability to generate or use different sets of rules for combining or grouping things in different ways"
    },
    {
        "id":3,
        "Name":"Flexibility of Closure",
        "Description":"The ability to generate or use different sets of rules for combining or grouping things in different ways"
    }, 
    {
        "id":4,
        "Name":"Fluency of Ideas",
        "Description":"The ability to generate or use different sets of rules for combining or grouping things in different ways"
    },
    {
        "id":5,
        "Name":"Inductive Reasoning",
        "Description":"The ability to generate or use different sets of rules for combining or grouping things in different ways"
    }
    ],
    "skillsList":[
    {
        "id":1,
        "Name":"Category Flexibility",
        "Description":"The ability to generate or use different sets of rules for combining or grouping things in different ways"
    },
    {
        "id":2,
        "Name":"Deductive Reasoning",
        "Description":"The ability to generate or use different sets of rules for combining or grouping things in different ways"
    },
    {
        "id":3,
        "Name":"Flexibility of Closure",
        "Description":"The ability to generate or use different sets of rules for combining or grouping things in different ways"
    }, 
    {
        "id":4,
        "Name":"Fluency of Ideas",
        "Description":"The ability to generate or use different sets of rules for combining or grouping things in different ways"
    },
    {
        "id":5,
        "Name":"Inductive Reasoning",
        "Description":"The ability to generate or use different sets of rules for combining or grouping things in different ways"
    }
    ],
	"heroSkillsList":[
    {
        "id":1,
        "Name":"Monitoring",
        "Description":"Monitoring/Assessing performance of yourself, others individuals, or organizations to make improvements or take corrective action."
    },
    {
        "id":2,
        "Name":"Speaking",
        "Description":"Monitoring/Assessing performance of yourself, others individuals, or organizations to make improvements or take corrective action."
    },
    {
        "id":3,
        "Name":"Science",
        "Description":"Using scientific rules and methods to solve problems."
    }, 
    {
        "id":4,
        "Name":"Reading Comprehension",
        "Description":"Understanding written sentences and paragraphs in work related documents."
    },
    {
        "id":5,
        "Name":"Writing",
        "Description":"Communicating effectively in writing as appropriate for the needs of the audience."
    },
    {
        "id":6,
        "Name":"Mathematics",
        "Description":"Using mathematics to solve problems."
    }
    ],
    /*CAREERSCAPE PART*/
    //zoom speed is depending on zoom_step (to allow exact zoom controll) (time is possible but not the zoom strength)
    "canvas-font":"HelveticaLightCondensed",
    "zoom_step":1.028,
    "zoom":1.4,
    "height":600,
    "width":1170,
    "anim_refresh":30,//(ms)
    "draw_refresh":30,//during animation
    //fraction of the animation time
    "fraction_translation":0.8,
    "fraction_refresh":0.7,
        //min 700
    "time_random":500,
    "time_anim":700,
    "delay_fade_in":150,
    "bezierCareerMove":[.12,.6,.35,.56],
    "bezier":[.64,1.52,.73,1.08],
    "linear":[1,1,.45,.45],
    "size":[50,70,90],
    "opacity_over":0.8,
    "opacity_edge_tertiary":0.6,
    "opacity_filter":0.5,
    "opacity_text_tertiary":0.5,
    //"text_size"
    "font_size_main":28,
    "font_size_secondary":23,
    "font_size_tertiary":21,
    "max_character_line":25,
    "doted":true,
    "doted_line":3,
    "doted_space":3,
    "line_width":1,
    //max 15, min 5
    "border_width":9,
    "animation":true,
    "color":
    {
        "decline":{
            "fill":["rgb(251,173,51)","rgb(237,112,51)","rgb(234,67,51)"],
            "border":["rgb(251,210,51)","rgb(239,138,51)","rgb(237,112,51)"],
            "text":["black","black","black"]
        },
        "growth":{
            "fill":["rgb(172,215,0)","rgb(131,205,2)","rgb(98,169,0)"],
            "border":["rgb(188,230,0)","rgb(188,230,0)","rgb(188,230,0)"],
            "text":["black","black","black"]
        }
    }
}