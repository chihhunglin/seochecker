SEO checker
=========

A small library that check html tags

## Installation

  `npm install seochecker`

## Usage

    const t = require('./seochecker')

    // t(rules, file, storngMax)

    t([1], 'index.html')

    t([1,2,3,4,5], 'index.html', 1)

## Params

  * rules (default: [])
  * file (default: 'index.html')
  * strongMax (default: 15)


## Rules

1. Detect if any `<img />` tag without alt attribute
2. Detect if any `<a />` tag without rel attribute
3. In `<head>` tag
i. Detect if header doesn’t have `<title>` tag
ii. Detect if header doesn’t have `<meta name=“descriptions” ... />` tag
iii. Detect if header doesn’t have `<meta name=“keywords” ... />` tag
4. Detect if there’re more than 15 `<strong>` tag in HTML (15 is a value should be configurable by user)
5. Detect if a HTML have more than one `<H1>` tag

