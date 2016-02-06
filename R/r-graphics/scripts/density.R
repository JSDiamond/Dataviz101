# Density curve

# Density curve 1
# Comparing two candidate’s ad density and frequency by air time

library(ggplot2)

ads <- read.csv("~/Desktop/Dataviz101/R/r-graphics/csv/pryor-cotton-ads.csv")
View(ads)

#size=0 turns off stroke
ggplot(ads, aes(x=AIRTIME, fill=SPONSOR)) + geom_density(size=0, alpha=0.6)


# Density curve 2
# Comparing two candidate’s ad density and frequency by air date

#use xlim to display only ads aired in October
ggplot(ads, aes(x=AIRDATE, fill=SPONSOR)) + geom_density(size=0, alpha=0.6) + xlim(20131001, 20131031)


# Violin plot 1
# Comparing density estimates for separate entities

#scale="count" scales areas proportionally to the number of observations in each group
#trim=FALSE keeps the tails; default is TRUE where range goes from min to max values
#adjust value changes smoothing in plot

ggplot(ads, aes(x=SPONSOR, y=AIRTIME, fill=SPONSOR)) + geom_violin(size=0, scale="count", adjust=1, trim=FALSE)


# Violin plot 2
# Box plot with median point overlaid

ggplot(ads, aes(x=SPONSOR, y=AIRTIME, fill=SPONSOR)) + 
  geom_violin(size=0, scale="count", adjust=1, trim=FALSE) + 
  geom_boxplot(width=.1, fill="black", size=0.5, alpha=0.5, outlier.color=NA) + 
  stat_summary(fun.y=median, geom="point", fill="white", shape=21, size=4)

