<?php

use Kirby\Cms\Page;
use Kirby\Cms\Structure;
use Kirby\Content\Field;

class SponsorsPage extends Page
{
	public function metaDefaults()
	{
		return [
			// 'robotsIndex' => false
		];
	}

	/**
	 * Override the page title to be static
	 * to the template name
	 */
	public function title(): Field
	{
		return new Field($this, 'title', t("page.{$this->intendedTemplate()->name()}.title"));
	}

	public function sponsors(): Structure
	{
		// return $this->content()->sponsors();
		// We want to pre filter the sponsors, by visible and the current year
		$sponsors = $this->content()->sponsors()->toStructure();
		$currentYear = $this->site()->edition()->toString();

		return $sponsors->filter(function ($sponsor) use ($currentYear) {
			return $sponsor->visible()->toBool() && in_array($currentYear, $sponsor->editions()->split());
		});
	}
}
