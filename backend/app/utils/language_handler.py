from typing import Dict, List, Optional
from langdetect import detect
from ..core.config import settings

class LanguageHandler:
    @staticmethod
    def detect_language(text: str) -> str:
        """
        Detect the language of a given text.
        Returns the language code (e.g., 'en', 'hi', 'ta', 'bn').
        """
        try:
            return detect(text)
        except:
            return settings.DEFAULT_LANGUAGE

    @staticmethod
    def is_supported_language(language_code: str) -> bool:
        """
        Check if a language code is supported by the application.
        """
        return language_code in settings.SUPPORTED_LANGUAGES

    @staticmethod
    def get_default_language() -> str:
        """
        Get the default language code.
        """
        return settings.DEFAULT_LANGUAGE

    @staticmethod
    def get_supported_languages() -> List[str]:
        """
        Get a list of all supported language codes.
        """
        return settings.SUPPORTED_LANGUAGES

    @staticmethod
    def validate_translations(translations: Dict[str, str]) -> bool:
        """
        Validate that all translations are in supported languages.
        """
        return all(
            LanguageHandler.is_supported_language(lang)
            for lang in translations.keys()
        )

    @staticmethod
    def get_translation(
        translations: Dict[str, str],
        language_code: str,
        fallback_language: Optional[str] = None
    ) -> str:
        """
        Get a translation for a specific language, with fallback support.
        """
        if language_code in translations:
            return translations[language_code]
        
        if fallback_language and fallback_language in translations:
            return translations[fallback_language]
        
        if settings.DEFAULT_LANGUAGE in translations:
            return translations[settings.DEFAULT_LANGUAGE]
        
        # If no translation is found, return the first available translation
        return next(iter(translations.values()), "")

    @staticmethod
    def format_multilingual_text(
        text: str,
        language_code: Optional[str] = None
    ) -> Dict[str, str]:
        """
        Format a text input into a multilingual dictionary.
        If language_code is not provided, it will be detected.
        """
        if not language_code:
            language_code = LanguageHandler.detect_language(text)
        
        if not LanguageHandler.is_supported_language(language_code):
            language_code = settings.DEFAULT_LANGUAGE
        
        return {language_code: text}

    @staticmethod
    def merge_translations(
        translations1: Dict[str, str],
        translations2: Dict[str, str]
    ) -> Dict[str, str]:
        """
        Merge two translation dictionaries, preferring translations2 for conflicts.
        """
        merged = translations1.copy()
        merged.update(translations2)
        return merged 