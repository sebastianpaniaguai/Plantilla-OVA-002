/**
 * Namespace jpit.activities.memory
 *
 * This namespace contain all related to memory game
 */
jpit.activities.memory = jpit.activities.registerType( 'jpit.activities.memory');

/**
 * Namespace jpit.activities.memory.instances
 *
 * This array store all memory instances
 */
jpit.activities.memory.instances = [];

/**
 * Class globals
 * Namespace jpit.activities.memory
 *
 * This class persists globally some variables used in the activity
 */
jpit.activities.memory.globals = {
    "actualGuessing" : 0,
    "uniqueIdAnswer" : 0
};

jpit.activities.memory.toString = function(){    
    return JPIT_ACTIVITY_GUESSING_NAMESPACE;
}; 

jpit.activities.memory.inputypes = {
    "mono" : 0,
    "multi" : 1
};

/**
 * Class game
 * Namespace jpit.activities.memory
 *
 * This class have control to the board
 */
jpit.activities.memory.game = function (container) {

    var $container;

    if (typeof container == 'object') {
        $container = container;
    }
    else {
        $container = $(container);
    }

    var obj = {
        "id" : 0,
        "matched_elements" : [],
        "container" : $container,
        "selected_elements_counter" : 0,
        "data_group_match" : [],
        "matched_elements" : [],
        "matched_elements_counter" : 0,
        "generated_ids" : [],
        "selected_elements_ids" : [],

        "getLocalId" : function () {
            return "jpit_activity_memory_" + this.id;
        },

        "generateElementId" : function ($li_array, i) {
            var generated_id = Math.floor(Math.random() * ($li_array.length)) + 1;
            while($.inArray(generated_id, this.generated_ids) != -1  && i < $li_array.length) {
                generated_id = Math.floor(Math.random() * ($li_array.length)) + 1;
            }
            
            return generated_id;
        },

        "processElementsNotMatched" : function(selected_elements_ids){
            if(this.selected_elements_ids.length == 2) {

                selected_elements_ids.forEach(function(currentValue, index, array){
                    var selected_element_id = currentValue;
                    $container.find("#" + selected_element_id ).css('background', 'url("' + $container.attr('data-cover-back') + '")');
                    obj.matched_elements[selected_element_id].selected = false;
                    $container.find("#" + selected_element_id).removeClass('memory-game-matched');
                });
            }
        },

        "processElementsMatched" : function(selected_elements_ids){
            if(this.selected_elements_ids.length == 2) {

                selected_elements_ids.forEach(function(currentValue, index, array){

                    var selected_element_id = currentValue;
                    $container.find("#" + selected_element_id ).addClass('memory-game-matched');
                    obj.matched_elements[selected_element_id].matched = true;
                });
            }
        },

        "calculateWeight" : function(){
            var weight = Math.floor(obj.matched_elements_counter * 100 / (obj.generated_ids.length - 1));
            return weight;
        },

        "disableBoard" : function(classEnable){
            obj.container.find('.cover').addClass(classEnable);
        },

        "enableBoard" : function(){
            obj.container.find('.cover.overlay').removeClass('overlay');
        },

        "isEnded" : function($elements_array){
            if(obj.matched_elements_counter == $elements_array.length){
                return true;
            }
            
            return false;
        }

    };
    return obj;

};