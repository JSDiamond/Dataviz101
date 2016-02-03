#load the data
worldhealth <- read.csv("~/Desktop/Dataviz101/R/r-graphics/csv/worldhealth2f.csv")
View(worldhealth)

#install if needed, then load libraries
install.packages('ggplot2')
library(ggplot2)
install.packages('maps')
library(maps)
install.packages('mapproj')
library(mapproj)
install.packages('plyr')
library(plyr)
install.packages('rgdal')
library(rgdal)

#assign a variable to display world map from library
worldmap <- map_data("world")
View(worldmap)

# World map with bubblechart
# Mapping the rate of communicable diseases
# sets up ggplot function
p <- ggplot()

# adds map function to ggplot function
p <- p + geom_polygon(data=worldmap, aes(x=long, y=lat, group = group),colour="grey90", fill="white" )

# adds bubbles on top of map
p <- p + geom_point(data=worldhealth, aes(x=long, y=lat, size = "Communicable"), color="red", alpha=0.4)
  + scale_size_area(max_size=10)

#execute all functions!
p



# World map with bubblechart 2
# Adds two sets of concentric bubbles and adds country labels

# sets up ggplot function and clears old map
p2 <- ggplot()

# adds map function to ggplot function
p2 <- p2 + geom_polygon(data=worldmap, aes(x=long, y=lat, group = group),colour="grey90", fill="white" )

# adds two sets of bubbles and labels
p2 <- p2 + geom_point(data=worldhealth, aes(x=long, y=lat, size = "comm"), color="red", alpha=0.4) + 
  geom_point(data=worldhealth, aes(x=long, y=lat, size = "Non.comm", color="blue"), alpha=0.6) 
  + scale_size_area(max_size=5) + labs(color="Type of disease", size="Number of incidents") + 
  scale_colour_discrete(labels=c("Communicable", "Non-communicable")) + 
  geom_text(data=worldhealth, aes(x=long, y=lat, label=Country), size=1, vjust=-4)

#execute all functions!
p2


# Choropleth 1
# Single color gradient (with labels)

unemployment <- read.csv("~/Desktop/Dataviz101/R/r-graphics-cheatsheet/public/csv/unemployment.csv")
View(unemployment)

#load USA subset of maps library
usa <- map_data("state")

# merge the unemployment and map data sets together
unemployment_map <- merge(usa, unemployment, by="region")

# sort by group, then order
unemployment_map <- arrange(unemployment_map, group, order)

#plot this baby!
ggplot(unemployment_map, aes(long, lat, group=group, fill=rate)) + 
  geom_polygon(color="white") + coord_map("polyconic")

# ------- N E W --------------------------------------
# now with centroid labels!

library(rgdal)

centroids <- setNames(do.call("rbind.data.frame", 
                              by(unemployment_map, unemployment_map$group, function(x) 
                              {Polygon(x[c('long', 'lat')])@labpt})), c('long', 'lat'))\
centroids

centroids$label <- unemployment_map$region[match(rownames(centroids), unemployment_map$group)]
centroids$label

ggplot(unemployment_map, aes(x=long, y=lat, group=group, fill=rate)) 
  + geom_polygon(color="white") + coord_map("polyconic") + 
  with(centroids, annotate(geom="text", x = long, y=lat, label = label, size = 1.5, color="white"))



# Choropleth 2
# Two color gradient, setting low and high colors

#for polygons (choropleths), use scale_fill_ instead of scale_color_
ggplot(unemployment_map, aes(x=long, y=lat, group=group, fill=rate)) + 
  geom_polygon(color="white") + coord_map("polyconic") + 
  scale_fill_gradient(low="blue", high="red")


# Choropleth 3
# Three color gradient, setting low, mid and high colors

#can set mid point
ggplot(unemployment_map, aes(x=long, y=lat, group=group, fill=rate)) + 
  geom_polygon(color="white") + coord_map("polyconic") + 
  scale_fill_gradient2(low="blue", mid="purple", high="red", midpoint=5)


# Choropleth 4
# Multiple color gradient

ggplot(unemployment_map, aes(x=long, y=lat, group=group, fill=rate)) + 
  geom_polygon(color="white") + coord_map("polyconic") + 
  scale_fill_gradientn(colours=c("darkblue", "blue", "purple", "red", "darkred"))
