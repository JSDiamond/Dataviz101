# Dot plot

# Basic dot plot
# Two sets of data points per time period, sized by data

library(ggplot2)
fedrate <- read.csv("~/Desktop/Dataviz101/R/r-graphics/csv/fed-fund-rate-4.csv")
View(fedrate)

ggplot() + geom_point(data=fedrate, aes(x=year_mar-0.1, y=rate_mar, size=number_mar), color="blue", shape=1) + 
  geom_point(data=fedrate, aes(x=year_june+0.1, y=rate_june, size=number_june), color="blue") + 
  scale_size_area(max_size=15) + 
  labs(size="Number of projections")


# Cleveland dot plot
# Alternative to a bar graph

msa <- read.csv("~/Desktop/Dataviz101/R/r-graphics/csv/msas-50-states-2.csv")
View(msa)

ggplot() + 
  geom_point(data=msa, aes(x=non_stem_pay_median, y=reorder(shortMSA, pay_gap), size=2, color="lightblue")) + 
  geom_point(data=msa, aes(x=stem_pay_median, y=reorder(shortMSA, pay_gap), size=2, color="green")) + 
  geom_segment(data=msa, aes(x=non_stem_pay_median, xend=stem_pay_median, y=shortMSA, yend=shortMSA), color="grey50") + 
  xlim(40000, 93000) + labs(color="type", size="") + 
  scale_color_discrete(labels=c("STEM pay", "Non-STEM pay"))
