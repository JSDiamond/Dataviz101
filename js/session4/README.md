#JS Session 4

##Charting basics

Run a server and view `index.html` in a browser

<br>

### Scales
Scales are functions that map from an input domain to an output range. Ordinal scales have a discrete domain, such as a set of names or categories. There are also quantitative scales, which have a continuous domain, such as the set of real numbers.
#### rangebands
A [D3 ordinal scale function](https://github.com/mbostock/d3/wiki/Ordinal-Scales#ordinal_rangeBands ) that subdivides an innterval into n evenly-spaced bands, where n is the number of (unique) values in the input domain.
![rangebands](assets/rangebands.png "rangebands")
##### rangeRoundBands
Like rangeBands, except guarantees that range values and band width are integers so as to avoid antialiasing artifacts.
