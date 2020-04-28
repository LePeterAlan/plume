{
    function myScript(thisObj){
        function myScript_buildUI(thisObj){
            var myPanel = (thisObj instanceof Panel) ? thisObj : new Window("palette", "Plume", undefined, {resizeable:true, closeButton: false});

            //UI
            res =  "Group{\
                        orientation:'column',\
                        PlumeButtons: Group{\
                            orientation:'row',\
                            Plume: Button{text:'Plume'},\
                            Plumage: Button{text:'Plumage'},\
                        },\
                        Presets:Panel{\
                            orientation:'column',\
                            List:Group{\
                                orientation:'row',\
                                alignment:['fill', 'fill'],\
                                PresetsTitle: StaticText{text:'Preset'},\
                                PresetsDropdown: DropDownList{properties:{items:['1', '2', '3']}, alignment:['fill', 'fill']},\
                            },\
                            Buttons1:Group{\
                                alignment:['center', 'fill'],\
                                ApplyPreset:Button{text:'Apply'},\
                            },\
                            Buttons2:Group{\
                                AddPreset:Button{text:'New'},\
                                DeletePreset:Button{text:'Delete'},\
                            },\
                        },\
                        TestButtons:Group{\
                            Test:Button{text:'Test'},\
                        },\
                    }";

        myPanel.grp = myPanel.add(res);


        //Buttons actions
        myPanel.grp.PlumeButtons.Plume.onClick = function() {
            addPseudoEffect("Plume");
        }

        myPanel.grp.PlumeButtons.Plumage.onClick = function() {
            addPseudoEffect("Plumage");
        }

        myPanel.grp.Presets.Buttons2.AddPreset.onClick = function() {
            addPreset();
        }

        myPanel.grp.Presets.Buttons2.DeletePreset.onClick = function() {
            deletePreset();
        }

        myPanel.grp.TestButtons.Test.onClick = function() {
            //Get last effect on selected layer
            var layerEffects = app.project.activeItem.selectedLayers[0].property("Effects")
            var effectsNumber = layerEffects.numProperties;
            var test = layerEffects.property(effectsNumber).property("Rotation offset IN").value;
            alert(test);
        }

        //Functions
        function addPreset() {
            var presetName = prompt("Enter your preset name");
            myPanel.grp.Presets.List.PresetsDropdown.add("item",presetName);
        }

        function deletePreset() {
            var dropdown = myPanel.grp.Presets.List.PresetsDropdown;
            dropdown.remove(dropdown.selection.index);
        }
                
        //Panel sizing
        myPanel.layout.layout(true);
        myPanel.grp.minimumSize = myPanel.grp.size;
        myPanel.layout.resize();
        myPanel.onResizing = myPanel.onResize = function(){this.layout.resize()};


        return myPanel;
      }
   
   
      var myScriptPal = myScript_buildUI(thisObj);

      if (myScriptPal != null && myScriptPal instanceof Window){
         myScriptPal.center();
         myScriptPal.show();
      }

   }
   myScript(this);

   //Variables
   var scriptFolderPath = (File($.fileName)).parent.absoluteURI;

    //Functions
    function addExpression() {
        myLayer = app.project.activeItem.selectedLayers[0];
        myLayer.position.expression = plumePosition;
    }

    function addPseudoEffect(presetName) {
        var presetFile = new File(scriptFolderPath+"/"+ presetName + ".ffx");
        if (presetFile.exists) {
            var activeComp = app.project.activeItem;
            activeComp.applyPreset(presetFile);
            var selectedLayer = activeComp.selectedLayers[0];
            var effectsCount = selectedLayer.property("Effects").numProperties;
            var pseudoEffectID = selectedLayer.property("Effects").property(effectsCount).matchName;
            return pseudoEffectID;
        }
        else {
            alert("Can't find preset");
        };
    }    
}