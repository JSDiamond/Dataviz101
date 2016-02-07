# Leaflet

install.packages("leaflet")
library(leaflet)

m <- leaflet()
m <- addTiles(m)
m <- addMarkers(m, lng=174.768, lat=-36.852, popup="The birthplace of R")
m

df = data.frame(Lat = 1:10, Long = rnorm(10))
leaflet(df) %>% addCircles()
addCircles(leaflet(df))
leaflet(df) %>% addCircles(lng = ~Long, lat = ~Lat)
leaflet() %>% addCircles(data = df)


df = data.frame(
  lat = rnorm(100),
  lng = rnorm(100),
  size = runif(100, 5, 20),
  color = sample(colors(), 100)
)
m = leaflet(df) %>% addTiles()
m %>% addCircleMarkers(radius = ~size, color = ~color, fill = FALSE)
m %>% addCircleMarkers(radius = runif(100, 4, 10), color = c('red'))


install.packages("maps")
library(maps)
mapStates = map("state", fill = TRUE, plot = FALSE)
leaflet(data = mapStates) %>% addTiles() %>%
  addPolygons(fillColor = topo.colors(10, alpha = NULL), stroke = FALSE)


m = leaflet() %>% setView(lng = -73.9510422, lat = 40.7165015, zoom = 10)
m %>% addTiles() 
# stylize with basemaps
m %>% addProviderTiles("CartoDB.Positron")




cities <- read.csv(textConnection("
City,Lat,Long,Pop
Boston,42.3601,-71.0589,645966
Hartford,41.7627,-72.6743,125017
New York City,40.7127,-74.0059,8406000
Philadelphia,39.9500,-75.1667,1553000
Pittsburgh,40.4397,-79.9764,305841
Providence,41.8236,-71.4222,177994
"))

leaflet(cities) %>% addTiles() %>% addProviderTiles("CartoDB.Positron") %>%
  addCircles(lng = ~Long, lat = ~Lat, weight = 1,
             radius = ~sqrt(Pop) * 30, popup = ~City
  )

accidents = read.csv("~/Desktop/Dataviz101/R/basics/data/NYPD_Motor_Vehicle_Collisions _2016-01-01.csv")

subaccident <- subset(accidents, accidents$BOROUGH %in% c("BROOKLYN", "QUEENS", "MANHATTAN", "BRONX", "STATEN ISLAND"))
View(subaccident)

leaflet(subaccident) %>% addTiles() %>% addProviderTiles("CartoDB.Positron") %>%
  addCircles(lng = ~LONGITUDE, lat = ~LATITUDE, weight = 1,
             radius = ~sqrt(NUMBER.OF.PERSONS.INJURED) * 100 , popup = ~NUMBER.OF.PERSONS.INJURED
  )



install.packages("maptools")
library(maptools)
install.packages("ggplot2")
library(ggplot2)
install.packages("rgdal")
library(rgdal)

hoods = readShapePoly("~/Desktop/Dataviz101/R/r-graphics/nycd_15d/nycd.shp")

p <- ggplot()
p <- p + geom_polygon(data=hoods, aes(x=long, y=lat, group=group, fill=id))
p


states <- readShapePoly("~/Desktop/Dataviz101/R/r-graphics/cb_2014_us_state_20m/cb_2014_us_state_20m.shp")
neStates <- subset(states, states$STUSPS %in% c(
  "CT","ME","MA","NH","RI","VT","NY","NJ","PA"
))
View(states)
View(hoods)
leaflet(neStates) %>% addTiles() %>% addProviderTiles("CartoDB.Positron") %>%
  addPolygons(
    stroke = FALSE, fillOpacity = 0.5, smoothFactor = 0.5,
    color = ~colorQuantile("YlOrRd", states$AWATER)(AWATER)
  )


subhoods <- subset(hoods, hoods$BoroCD > c('400'))
View(subhoods)

#geojson
hoods <- readLines("~/Desktop/Dataviz101/R/r-graphics/geojson/community_districts.geojson") %>% paste(collapse = "\n")

leaflet() %>% setView(lng = -73.9510422, lat = 40.7165015, zoom = 10) %>%
  addTiles() %>% addProviderTiles("CartoDB.Positron") %>%
  addGeoJSON(hoods, weight = 1, color = "#444444", fill = FALSE)

#topojson
census_tracts <- readLines("~/Desktop/Dataviz101/R/r-graphics/geojson/census_tracts_2010.geojson") %>% paste(collapse = "\n")


leaflet() %>% setView(lng = -73.9510422, lat = 40.7165015, zoom = 10) %>%
  addTiles() %>% addProviderTiles("CartoDB.Positron") %>%
  addTopoJSON(census_tracts, weight = 1, color = "#444444", fill = FALSE)



