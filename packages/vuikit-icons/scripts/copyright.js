import pkg from '../package.json'
import { run, banner } from '@miljan/build'

const Copyright = `/**
 * Vuikit - ${pkg.name} ${pkg.version}
 * (c) 2018 ${pkg.author.name}
 * @license ${pkg.license}
**/

/* The icons source code is part of UIkit icons library,
  Copyright (c) 2013-2018 YOOtheme GmbH, getuikit.com */`

run(async () => {
  await banner('{dist,lib}/**/*.js', Copyright)
})