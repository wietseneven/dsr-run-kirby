<?php

/** @var Kirby\Cms\Site $site */ ?>

<footer class="bg-black print:hidden print:text-black text-white mt-24 ">
	<div class="mx-auto max-w-7xl py-12 gap-4 w-[90%] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 print:w-full">
		<article class="prose text-white">
			<h2 class="mb-4 text-xl">Contact</h2>

			<address class="not-italic">
				Stichting Dinkel Survival Run
				<br />
				KVK: 88627454
				<br />
				<br />
				<a href=" mailto:run@dinkelsurvivalrun.nl">
					run@dinkelsurvivalrun.nl
				</a>
			</address>
		</article>
		<nav class="prose text-white">
			<h2 class="text-xl mb-4">Links</h2>
			<ul class="not-prose">
				<li>
					<a class="hover:underline" href="/informatie/aanmelden">Aanmelden</a>
				</li>
				<li>
					<a class="hover:underline" href="/sponsoren/word-sponsor">Word sponsor</a>
				</li>
				<li>
					<a class="hover:underline" href="/pers">Persinformatie</a>
				</li>
				<li>
					<a class="hover:underline" href="https://dinkelsurvivalrunners.nl">
						Onze vereniging
					</a>
				</li>
			</ul>
		</nav>
		<?php if ($sponsor_url = $site->sponsor_url()) : ?>
			<?php $sponsor_logo = $site->sponsor_logo()->toFile() ?>
			<?php $sponsor_name = $site->sponsor_name() ?>
			<div class="prose ml-auto lg:col-start-4">
				<h2 class="text-xl mb-4">Hoofdsponsor</h2>
				<a className="self-end lg:col-start-4 md:text-right no-underline not-prose" href="<?= $sponsor_url; ?>">
					<img alt="<?= $sponsor_logo->alt(); ?>" width="<?= $sponsor_logo->width(); ?>" height="<?= $sponsor_logo->height(); ?>" src="<?= $sponsor_logo->url(); ?>" />
				</a>
			</div>
		<?php endif ?>
	</div>
</footer>
