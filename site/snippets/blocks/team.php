<section <?= $block->attr(['class' => [$class, 'mx-auto max-w-7xl grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-8 w-[90%]']]) ?>>
	<ul class="lg:col-span-2 space-y-12 sm:grid sm:grid-cols-2 sm:gap-12 sm:space-y-0 lg:gap-x-8">
		<?php foreach ($block->items()->toStructure() as $member) : ?>
			<li class="flex items-center space-x-4 lg:space-x-6">
				<?php if ($member->image()->isNotEmpty()) : ?>
					<?php snippet('picture', ['image' => $member->image()->toFile(), 'ratio' => 1, 'preset' => 'avatar', 'imgClass' => 'h-16 w-16 rounded-full lg:h-20 lg:w-20']) ?>
				<?php endif; ?>
				<div class="space-y-1 text-lg leading-6 [&_a]:text-sm [&_a:hover]:underline">
					<h3><?= $member->name(); ?></h3>
					<p class="text-dsr-orange-500 block"><?= $member->role(); ?></p>
					<?php if ($member->emailaddress()->isNotEmpty()) : ?>
						<a
							class="text-dsr-orange-500 block"
							href="mailto:<?= $member->emailaddress(); ?>">
							<?= $member->emailaddress(); ?>
						</a>
					<?php endif; ?>
					<?php if ($member->phone()->isNotEmpty()) : ?>
						<a
							class="text-dsr-orange-500 block"
							href="tel:<?= $member->phone(); ?>">
							<?= $member->phone(); ?>
						</a>
					<?php endif; ?>
				</div>
			</li>
		<?php endforeach; ?>
	</ul>
</section>
