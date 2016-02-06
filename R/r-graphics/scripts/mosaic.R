# Mosaic plot

# Mosaic plot 1
# Split by state, party and tone; highlight by party

install.packages("vcd")
library(vcd)
ads <- read.csv("~/Desktop/Dataviz101/R/r-graphics/csv/ads.csv")
View(ads)

#direction of split determined by v or h
mosaic (~ state + party + tone, data=ads, highlighting="tone", highlighting_fill= c("red", "blue"), direction= c("v", "h", "v"))


# Mosaic plot 2
# Split by state, party and tone; highlight by tone
mosaic (~ state + party + tone, data=ads, highlighting="tone", highlighting_fill= c("darkblue", "blue", "dark red", "red"), direction= c("v", "h", "v"))
