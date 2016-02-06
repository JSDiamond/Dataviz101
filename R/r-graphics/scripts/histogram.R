# Histogram

# Basic histogram
# Distribution of data from only one column of data

library(ggplot2)

fed <- read.csv("~/Desktop/Dataviz101/R/r-graphics/csv/fed-fund-rate-3.csv")
View(fed)

ggplot(fed, aes(x=rate)) + geom_histogram(fill="lightblue", color="blue")

# Horizontal histogram
# Creating a subset of data and fliping x/y axes

# create a subset of data
fed2016 <- subset(fed, year==2016)
View(fed2016)

ggplot(fed2016, aes(x=rate)) + geom_histogram(fill="lightblue", color="blue") + coord_flip()

# Multiple histograms from grouped data
# Using facet to separate data into groups, setting x/y axis limits

ggplot(fed, aes(x=rate)) + 
  geom_histogram(fill="lightblue", color="blue") + 
  xlim(0,5) + ylim(0,17) + coord_flip() + facet_grid(year ~.)

# Multiple stacked histograms
# Adding tick marks by 1/8 increments

# Convert year column into a factor
fed$year <- factor(fed$year)

ggplot(fed, aes(x=rate, fill=year)) + 
  geom_histogram(position="identity", alpha=0.4) + 
  scale_x_continuous(breaks=seq(0,5, by=.125)) + coord_flip()
