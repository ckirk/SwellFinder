class MainController < ApplicationController

  def index
  	location = 'wna_nj_seaside'
  	response = HTTParty.get('http://www.swellinfo.com/data/timeline/' + location + '.xml')
  	all_rows = response["surfcond_xml"]["data"]
  	@swellData = []
  	all_rows.each do |row|
  		id = row['id'].to_i
      date_string =  row['month'] + "/" + row['day'] + "/#{Time.now.year}-" + row['hour']
      datetime = DateTime.strptime(date_string, "%m/%d/%Y-%l%P")
			data = {
  			id: id,

  			hour: row['hour'],
  			day_name: row['day_name'],
  			month: row['month'],
  			day: row['day'],
        datetime: datetime,

  			surf: row['surf'],
  			wind: row['wind'],
  			cond: row['cond'],

  			swell1: row['swell1'],
  			swell2: row['swell2']
  		}
  		@swellData[id] = data
  	end

    respond_to do |format|
      format.html
      format.json { render :json => @swellData.to_json }
    end
  	#binding.pry
  end

  def d3_v1
  end

  def d#_2
  end

end