# Heat map

# Basic heatmap
# Two color gradient, setting low and high colors

library(ggplot2)

presidents <- read.csv("~/Desktop/Dataviz101/R/r-graphics/csv/presidents.csv")
View(presidents)

#setup base plot
class(presidents)
p <- ggplot(presidents, aes(x=year, y=quarter, fill=rating))

#can use either geom_tile() or geom_raster()
p + geom_tile() + 
  scale_x_continuous(breaks = seq(1940, 1976, by = 4)) + 
  scale_y_reverse() + 
  scale_fill_gradient(low="red", high="blue")


# Basic heatmap 2
# Three color gradient, setting low, mid and high colors

# setup base plot
p <- ggplot(presidents, aes(x=year, y=quarter, fill=rating))

#can alter midpoint value to skew colors
p + geom_tile() + 
  scale_x_continuous(breaks = seq(1940, 1976, by = 4)) + 
  scale_y_reverse() + 
  scale_fill_gradient2(low="red", high="blue", mid="purple", midpoint=50, limits=c(0,100))
