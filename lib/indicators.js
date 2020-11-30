
	async function getRSI(timeFrame, count, offset = 0, verbose = false) {

			//$timeFrame = "5m";
			//$count = 22;
			let hist = await getCandles(timeFrame, count, offset);

			/*if ($verbose) {
				//var_dump($hist);
				//echo "<br><br>";

				echo "<pre>";
				echo "<textarea rows='30' cols='80'>";
				//var_dump($hist);
				print_r($hist);
				echo "</textarea>";
				echo "</pre>";
				echo "<br>";
			}*/

			//calc RSI
			let totalGain = 0, totalLoss = 0;
			let gainCalc =  null, lossCalc = null;
			let compareGreater = null, compareLess = null;

			let i = 0;
			let rsi = null, rs = null;

			for(i=0; i<count-1; i++) {
					compareGreater = hist[i]["close"] > hist[i+1]["close"];
					compareLess = hist[i]["close"] < hist[i+1]["close"];
					
					gainCalc = hist[i]["close"] - hist[i+1]["close"];
					lossCalc = hist[i+1]["close"] - hist[i]["close"];
							
					if(compareGreater){
						totalGain += gainCalc;
						//if ($verbose) echo "Gain ".$gainCalc."<br>";
					}
					
					if(compareLess){
						totalLoss += lossCalc;
						//if ($verbose) echo "Loss ".$lossCalc."<br>";
					}				
			}

			let averageGain = totalGain / count-1;
			//if ($verbose) echo "Avg Gain ".$averageGain."<br>";
			let averageLoss = totalLoss / count-1;
			//if ($verbose) echo "Avg Loss ".$averageLoss."<br>";

			if(averageLoss == 0){
				rsi = 100;
			} else {
				//calc and normalize
				rs = averageGain / averageLoss;				
				rsi = 100 - (100 / ( 1 + rs));
			}

			return rsi;
	}