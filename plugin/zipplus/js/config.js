jQuery.noConflict();

(function($,PLUGIN_ID) {
    "use strict";
 
	$(document).ready(function() {
		// プラグインIDの設定
		var KEY = PLUGIN_ID;
		var conf = kintone.plugin.app.getConfig(KEY);
     
		//既に値が設定されている場合はフィールドに値を設定する
		if (conf){
     	   $('#zip_code').val(conf['zip']);
	 	   $('#addr_code').val(conf['addr']);
	 	   $('#btn_code').val(conf['btn']);
	 	   $('#btn_text').val(conf['btn_text']);
	 	   $('#state_text').val(conf['state_text']);
			}
 
		//「保存する」ボタン押下時に入力情報を設定する
		$('#submit').click(function() {
     	   var config = [];
	 	   var zip = $('#zip_code').val();
	 	   var addr = $('#addr_code').val();
	 	   var btn = $('#btn_code').val();
	 	   var btn_text = $('#btn_text').val();
	 	   var state_text = $('#state_text').val();
         
	 	   if (zip =="" ||  addr =="" || btn_text =="" || btn ==""){
          	  alert("必須項目が入力されていません");
		  	  return;
        	}
			config['zip'] = zip;
			config['addr'] = addr;
			config['btn'] = btn;
			config['btn_text'] = btn_text;
			config['state_text'] = state_text;
 
			kintone.plugin.app.setConfig(config);
			});
     
		//「キャンセル」ボタン押下時の処理
		$('#cancel').click(function() {
            history.back();
    	});
    });
})(jQuery,kintone.$PLUGIN_ID);