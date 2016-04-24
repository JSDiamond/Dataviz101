#JS Session 12


## User Interface (Bonus: Regular Expressions)
<br>


### U.I. and navigation elements

[Twitter bootstrap](http://getbootstrap.com/getting-started/) is a front-end framework for elements like buttons, drop-downs, form fields, and other [interface components](http://getbootstrap.com/components/), as well as a [grid system](http://getbootstrap.com/css/#grid) and [other functionality](http://getbootstrap.com/javascript/).


[Simple Parallax Scrolling](http://pixelcog.github.io/parallax.js/)

[Native javascript touch events](http://tutorials.jenkov.com/responsive-mobile-friendly-web-design/touch-events-in-javascript.html)

[Hammer.js, a touch event library](http://hammerjs.github.io/)

<br>

### Regex

First, a regex is a text string. For instance, `foo` is a regex. So is `[A-Z]+:\d+.`

Those text strings describe patterns to find text or positions within a body of text. For instance, the regex `foo` matches the string `foo`, the regex `[A-Z]+:\d+` matches string fragments like `F:1` and `GO:30`, and the regex `(?<=[a-z])(?=[A-Z])` matches the position in the string CamelCase where we shift from a lower-case letter to an upper-case letter.

Typically, these patterns (which can be beautifully intricate and precise) are used for four main tasks: to find text within a larger body of text; to validate that a string conforms to a desired format; to replace text (or insert text at matched positions, which is the same process); and to split strings. 

In [JavaScript, regular expressions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions) are also objects. These patterns are used with the `exec` and `test` methods of RegExp, and with the `match`, `replace`, `search`, and `split` methods of `String`.

Using a regular expression literal, which consists of a pattern enclosed between slashes, as follows:

	var re = /ab+c/
or

	var re = new RegExp("ab+c")

Regular expression literals provide compilation of the regular expression when the script is loaded. When the regular expression will remain constant, use this for better performance.

#####Usage:

`exec`
A RegExp method that executes a search for a match in a string. It returns an array of information.

`test`
A RegExp method that tests for a match in a string. It returns true or false.

`match`	
A String method that executes a search for a match in a string. It returns an array of information or null on a mismatch.

`search`	
A String method that tests for a match in a string. It returns the index of the match, or -1 if the search fails.

`replace`	
A String method that executes a search for a match in a string, and replaces the matched substring with a replacement substring.

`split`	
A String method that uses a regular expression or a fixed string to break a string into an array of substrings.

	re.exec('abcdef')
	//["abc"]
	
	re.test('abcdef')
	//true
	
	'abcdef'.match(/ab+c/)
	//["abc"]
	
	'abcdef'.replace(/ab+c/, 'xxx')
	//"xxxdef"
	
	'abcdef'.search(/c/)
	//2
	
	'abcdef'.split(/c/)
	//["ab", "def"]
	
#####Using parenthesized substring matches

Including parentheses in a regular expression pattern causes the corresponding submatch to be remembered. For example, /a(b)c/ matches the characters 'abc' and remembers 'b'. To recall these parenthesized substring matches, use the Array elements [1], ..., [n].

The number of possible parenthesized substrings is unlimited. The returned array holds all that were found. The following examples illustrate how to use parenthesized substring matches.

The following script uses the `replace()` method to switch the words in the string. For the replacement text, the script uses the $1 and $2 in the replacement to denote the first and second parenthesized substring matches.

	var re = /(\w+)\s(\w+)/
	"John Smith".replace(re, "$2, $1")
	//"Smith, John"
	
	"John Smith".match(re)
	//["John Smith", "John", "Smith"]
	
	
Email address pattern
	
	var email_pattern = /[A-z0-9-]{1,}\@[A-z0-9-\.]{1,}/g
	
	var paragraph = Lorem ipsum dolor sit amet, consectetur adipiscing deborah_schoman@fa.org elit. Curabitur erat neque, rhoncus ut laoreet et, pulvinar nec mauris. Mauris nec nunc tortor. Curabitur nulla orci, gryphon75672@hot.mail.com laoreet eget tincidunt nec, ultricies sit amet ex. Nullam porttitor nunc nibh, in freds@monarch-info.com eleifend nulla  sales@calpak-usa.com aliquam eu.
	
	var emails = paragraph.match(email_pattern)
	//["deborah_schoman@fa.org", "gryphon75672@hot.mail.com", "freds@monarch-info.com", "sales@calpak-usa.com"]
	
	
	
