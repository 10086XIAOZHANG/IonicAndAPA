IONIC+ANGULARJS+CORDOVA+REQUIREJS+WEBPACK


修改cordovaBarcodeScanner.jar
// NOTE: encoding not functioning yet
    $cordovaBarcodeScanner
      .encode(BarcodeScanner.Encode.TEXT_TYPE, "http://www.nytimes.com")
      .then(function(success) {
        // Success!
      }, function(error) {
        // An error occurred
      });

  }, false);
  添加监听
 	public void setDecodeListener()
	{
		mDataListener =  new DataListener()
		{
			public void onData(ScanDataCollection scanDataCollection)
			{
				String data = "";
				ArrayList<ScanData> scanDataList = scanDataCollection.getScanData();

				for(ScanData scanData :scanDataList)
				{
					data = scanData.getData();
				}
			    scanning=false;
			    setRetData(data);
				canDecode = true;
			}
			
		};
		mScanner.addDataListener(mDataListener);
		 
	}
	//扫描
	 public void scan(JSONArray args) {
		if(time==0) {
			try
			{
				mScanner.enable();
			}
			catch(ScannerException se)
			{
				se.printStackTrace();
			}
		}
		
    	scan();
		}