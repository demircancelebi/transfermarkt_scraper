mkdir inputs
for i in {2000..2014}
do
  curl "http://www.transfermarkt.com/super-lig/gesamtspielplan/wettbewerb/TR1?saison_id=$i&spieltagVon=1&spieltagBis=34" >> "inputs/input_$i.html"
  node index.js "inputs/input_$i.html"
done