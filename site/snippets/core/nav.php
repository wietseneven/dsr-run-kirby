<?php

/** @var Kirby\Cms\Site $site */ ?>

<header class="fixed print:hidden w-full top-0 items-center justify-between flex px-4 py-4 text-white font-stretch font-bold z-40 gap-4 before:transition-all before:duration-500 before:opacity-0 before:absolute before:inset-0 before:transform before:-translate-y-full before:bg-black before:content-['']<?php e($page->intendedTemplate() == 'gallery', ' bg-black sticky') ?>" data-controller="nav">
	<a class="flex flex-1 relative bg-no-repeat bg-contain bg-left-top" href="/">
		<?php if ($asset = asset('assets/images/run-logo-white.svg')) : ?>
			<img src="<?= $asset->url() ?>" height="87" width="250" alt="Dinkel Survivalrun">
		<?php endif ?>
	</a>
	<nav class="flex flex-[2] print:hidden justify-end md:justify-center">
		<ul class="max-md:fixed max-md:pointer-events-none opacity-0 -translate-y-4 transition-all duration-500 max-md:inset-0 max-md:px-8 max-md:invisible gap-8 uppercase bg-black overflow-auto md:overflow-visible md:flex flex-col md:flex-row pt-24 pb-12 md:pb-0 md:pt-0 md:visible md:opacity-100 md:static md:bg-transparent md:items-center md:pointer-events-auto md:translate-y-0" data-nav-target="navList">
			<?php foreach ($site->children()->listed() as $child) : ?>
				<?php $isActive = $child->isActive() ?>
				<li class="group font-expanded">
					<?php if ($child->hasChildren()) : ?>
						<button data-nav-target="button" data-nav-link="<?= $child->url() ?>" class="uppercase transition-all group-hover:text-dsr-orange relative block whitespace-nowrap font-expanded">
							<?= $child->title(); ?>
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon" class="size-8 fill-current inline-block text-dsr-orange transition-transform -translate-y-1 group-hover:sm:translate-y-1">
								<path fill-rule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd"></path>
							</svg>
						</button>

						<ul class="transition-all px-8 md:invisible md:absolute md:top-full md:w-64 md:bg-white md:p-4 md:text-black md:rounded md:opacity-0 md:pointer-events-none md:-translate-y-1 md:drop-shadow-lg group-hover:md:opacity-100 group-hover:md:translate-y-0 group-hover:md:pointer-events-auto group-hover:md:visible">
							<li>
								<a class="hover:text-dsr-orange py-2 block <?php e($child->isActive(), 'text-dsr-orange') ?>" href="<?= $child->url(); ?>">
									<?= $child->title(); ?>
								</a>
							</li>
							<?php foreach ($child->children()->listed() as $subchild) : ?>
								<li>
									<a class="hover:text-dsr-orange py-2 block <?php e($subchild->isActive(), 'text-dsr-orange') ?>" href="<?= $subchild->url(); ?>">
										<?= $subchild->title(); ?>
									</a>
								</li>
							<?php endforeach ?>
						</ul>
					<?php else : ?>
						<a href="<?= $child->url(); ?>" class="uppercase transition-all hover:text-dsr-orange relative block whitespace-nowrap"><?= $child->title(); ?></a>
					<?php endif; ?>
				</li>
			<?php endforeach ?>
		</ul>
		<button class="uppercase p-2 border relative rounded text-sm md:hidden" data-action="click->nav#toggle" type="button">
			Menu
		</button>
	</nav>
	<span class="md:block flex-1 hidden"></span>
</header>
<div class="nav-sentinel" style="position: absolute; top: 10px; width: 1px; height: 1px; visibility: hidden;"><?= $page->title(); ?></div>