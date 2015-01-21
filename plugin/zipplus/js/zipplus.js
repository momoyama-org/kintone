//zipplus plugin js-file
//since 2015/01/12
jQuery.noConflict();

(function ($,PLUGIN_ID) {
  
    "use strict";
    
    var zip_field;//
    var addr_field;
    var state_text;
   
    //郵便番号から住所へ
	function zip_to_addr() {

		var record = kintone.app.record.get();	
		var zip = record["record"][zip_field]["value"];

		if(zip === ''){
            return false;
        	}
                
		$.ajax({
        	type : 'get',
            url : 'https://maps.googleapis.com/maps/api/geocode/json',	//https側を利用すること 
            crossDomain : true,
            dataType : 'json',
            data : {
                address : zip,
                language : 'ja',
                sensor : false
            },
            success : function(resp){
                if(resp.status == "OK"){   
                    var obj = resp.results[0].address_components;
                    var adrSize = obj.length -1;
                    
                          var tmp = '';
						  var i=adrSize - 1;
                            for(;i > 0; i --){
                            	if(obj[i].long_name == state_text) {
	                            	continue;
                            	}

                                tmp += obj[i].long_name;
                            }
                            record["record"][addr_field]["value"] = tmp;
							kintone.app.record.set(record);
                    }
                    
                }
            });
	}
  
    // 詳細画面に郵便番号検索用のボタンを設置します
    function zipplus(event){
         
        // プラグインIDの設定
        var KEY = PLUGIN_ID;
         
        //設定値読み込み用変数
        var config = kintone.plugin.app.getConfig(KEY);
         
        //設定値読み込み
        if (!config) return false;
        zip_field = config["zip"];
        addr_field = config["addr"];
        state_text = config["state_text"];

		var btn_space = config["btn"];
        var btn_text = config["btn_text"];
        
        //あらかじめ用意したスペースにボタンを配置する
		//スペース要素の取得
		var se = kintone.app.record.getSpaceElement(btn_space);
		if (!se) return false;
  
		//ボタンの作成
		var btn = document.createElement('button');
		btn.appendChild(document.createTextNode(btn_text));
		btn.id = "zipplus"; 
		btn.name = "zipplus";
		se.appendChild(btn);
		btn.style.marginTop = '30px';
  
		$("#zipplus").click( zip_to_addr);
  
        return event;
  
    }
  
    // 登録・更新イベント(新規レコード、編集レコード、一覧上の編集レコード)
    kintone.events.on(['app.record.create.show',
                       'app.record.edit.show'], zipplus);
  
})(jQuery,kintone.$PLUGIN_ID);