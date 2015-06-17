class MainController < ApplicationController

  def index
  	location = 'wna_nj_seaside'
  	response = HTTParty.get('http://www.swellinfo.com/data/timeline/' + location + '.xml')
  	all_rows = response["surfcond_xml"]["data"]
  	@swellData = []
  	all_rows.each do |row|
  		id = row['id'].to_i
			data = {
  			id: id,

  			hour: row['hour'],
  			day_name: row['day_name'],
  			month: row['month'],
  			day: row['day'],

  			surf: row['surf'],
  			wind: row['wind'],
  			cond: row['cond'],

  			swell1: row['swell1'],
  			swell2: row['swell2']
  		}
  		@swellData[id] = data
  	end
  	#binding.pry
  end

  def d3_v1
  end

  def d#_2
  end

end