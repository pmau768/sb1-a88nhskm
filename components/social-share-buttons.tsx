"use client"

import { Button } from "@/components/ui/button"
import { 
  Facebook,
  Twitter,
  Mail,
  Share2,
  Printer,
  Clipboard,
  CheckCheck,
  Instagram,
  Send
} from "lucide-react"
import { useEffect, useState } from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { toast } from "sonner"

interface SocialShareButtonsProps {
  title?: string
  url?: string
  description?: string
  compact?: boolean
  media?: string
  hashtags?: string[]
  showCount?: boolean
}

export function SocialShareButtons({ 
  title = "Help find this lost dog", 
  url, 
  description = "Please share to help reunite this dog with their family.",
  compact = false,
  media = "",
  hashtags = ["treksnout", "dogs", "adoption"],
  showCount = false
}: SocialShareButtonsProps) {
  const [currentUrl, setCurrentUrl] = useState<string>("")
  const [isShareSupported, setIsShareSupported] = useState<boolean>(false)
  const [isCopied, setIsCopied] = useState<boolean>(false)
  const [shareCounts, setShareCounts] = useState({
    facebook: 0,
    twitter: 0,
    total: 0
  })
  
  useEffect(() => {
    // Set the current URL when on the client side
    if (typeof window !== 'undefined') {
      setCurrentUrl(url || window.location.href)
      // Check if share API is supported
      setIsShareSupported('share' in navigator)
      
      // Fetch share counts (simulated here)
      fetchShareCounts(url || window.location.href)
    }
  }, [url])
  
  const fetchShareCounts = async (shareUrl: string) => {
    // This would typically be an API call to a service like SharedCount
    // Here we're just simulating it
    // In a real implementation, you'd call your backend which calls a service API
    
    // Simulate a random count
    const facebookCount = Math.floor(Math.random() * 100)
    const twitterCount = Math.floor(Math.random() * 50)
    
    setShareCounts({
      facebook: facebookCount,
      twitter: twitterCount,
      total: facebookCount + twitterCount
    })
  }

  const shareData = {
    title,
    text: description,
    url: currentUrl
  }

  const handleNativeShare = async () => {
    if (isShareSupported) {
      try {
        await navigator.share(shareData)
        console.log('Shared successfully')
        incrementShareCount('total')
        toast.success("Thanks for sharing!")
      } catch (err) {
        console.error('Error sharing:', err)
      }
    } else {
      alert('Web Share API not supported on this browser. Please use the other share options.')
    }
  }

  const shareFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}&quote=${encodeURIComponent(title)}`,
      'facebook-share-dialog',
      'width=800,height=600'
    )
    incrementShareCount('facebook')
    toast.success("Thanks for sharing on Facebook!")
  }

  const shareTwitter = () => {
    const hashtagString = hashtags.length > 0 ? '&hashtags=' + hashtags.join(',') : '';
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(currentUrl)}${hashtagString}`,
      'twitter-share-dialog',
      'width=800,height=600'
    )
    incrementShareCount('twitter')
    toast.success("Thanks for sharing on Twitter!")
  }

  const shareEmail = () => {
    window.location.href = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(description + '\n\n' + currentUrl)}`
    incrementShareCount('total')
  }
  
  const shareWhatsapp = () => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const url = isMobile
      ? `whatsapp://send?text=${encodeURIComponent(title + '\n\n' + currentUrl)}`
      : `https://web.whatsapp.com/send?text=${encodeURIComponent(title + '\n\n' + currentUrl)}`;
      
    window.open(url, '_blank');
    incrementShareCount('total')
    toast.success("Thanks for sharing on WhatsApp!")
  }
  
  const shareInstagram = () => {
    // Instagram doesn't have a direct share URL, but we can open the app
    toast.info('To share on Instagram:\n1. Copy the link\n2. Open Instagram\n3. Paste in a direct message or story');
    copyToClipboard()
  }
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(currentUrl)
      .then(() => {
        setIsCopied(true)
        toast.success("Link copied to clipboard!")
        setTimeout(() => setIsCopied(false), 2000)
      })
      .catch(err => {
        console.error('Failed to copy: ', err)
        toast.error("Failed to copy link")
      })
  }
  
  const incrementShareCount = (platform: 'facebook' | 'twitter' | 'total') => {
    setShareCounts(prev => {
      const updated = { ...prev };
      updated[platform] += 1;
      if (platform !== 'total') {
        updated.total += 1;
      }
      return updated;
    });
    
    // In a real app, you'd also send this data to your backend
    console.log(`Shared on ${platform}`)
  }
  
  const printPage = () => {
    window.print();
  }

  if (compact) {
    return (
      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center gap-1"
              aria-label="Share content"
            >
              <Share2 className="h-4 w-4" />
              <span>Share</span>
              {showCount && shareCounts.total > 0 && (
                <span className="ml-1 text-xs bg-primary/10 rounded-full px-1.5 py-0.5">
                  {shareCounts.total}
                </span>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem onClick={shareFacebook}>
              <Facebook className="mr-2 h-4 w-4" aria-hidden="true" />
              <span>Facebook</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={shareTwitter}>
              <Twitter className="mr-2 h-4 w-4" aria-hidden="true" />
              <span>Twitter</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={shareWhatsapp}>
              <Send className="mr-2 h-4 w-4" aria-hidden="true" />
              <span>WhatsApp</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={shareEmail}>
              <Mail className="mr-2 h-4 w-4" aria-hidden="true" />
              <span>Email</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={copyToClipboard}>
              {isCopied ? (
                <CheckCheck className="mr-2 h-4 w-4 text-green-500" aria-hidden="true" />
              ) : (
                <Clipboard className="mr-2 h-4 w-4" aria-hidden="true" />
              )}
              <span>{isCopied ? "Copied!" : "Copy Link"}</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <Button 
        variant="outline" 
        size="sm" 
        className="flex items-center gap-1 mobile-tap-area h-10 min-h-10" 
        onClick={shareFacebook}
        aria-label="Share on Facebook"
      >
        <Facebook className="h-4 w-4" aria-hidden="true" />
        <span className="hidden sm:inline">Facebook</span>
        {showCount && shareCounts.facebook > 0 && (
          <span className="ml-1 text-xs bg-primary/10 rounded-full px-1.5 py-0.5">
            {shareCounts.facebook}
          </span>
        )}
      </Button>
      <Button 
        variant="outline" 
        size="sm" 
        className="flex items-center gap-1 mobile-tap-area h-10 min-h-10" 
        onClick={shareTwitter}
        aria-label="Share on Twitter"
      >
        <Twitter className="h-4 w-4" aria-hidden="true" />
        <span className="hidden sm:inline">Twitter</span>
        {showCount && shareCounts.twitter > 0 && (
          <span className="ml-1 text-xs bg-primary/10 rounded-full px-1.5 py-0.5">
            {shareCounts.twitter}
          </span>
        )}
      </Button>
      <Button 
        variant="outline" 
        size="sm" 
        className="flex items-center gap-1 mobile-tap-area h-10 min-h-10" 
        onClick={shareWhatsapp}
        aria-label="Share on WhatsApp"
      >
        <Send className="h-4 w-4" aria-hidden="true" />
        <span className="hidden sm:inline">WhatsApp</span>
      </Button>
      <Button 
        variant="outline" 
        size="sm" 
        className="flex items-center gap-1 mobile-tap-area h-10 min-h-10" 
        onClick={shareEmail}
        aria-label="Share via Email"
      >
        <Mail className="h-4 w-4" aria-hidden="true" />
        <span className="hidden sm:inline">Email</span>
      </Button>
      
      <Button 
        variant="outline" 
        size="sm" 
        className="flex items-center gap-1 mobile-tap-area h-10 min-h-10" 
        onClick={copyToClipboard}
        aria-label={isCopied ? "Link copied" : "Copy link"}
      >
        {isCopied ? (
          <CheckCheck className="h-4 w-4 text-green-500" aria-hidden="true" />
        ) : (
          <Clipboard className="h-4 w-4" aria-hidden="true" />
        )}
        <span className="hidden sm:inline">{isCopied ? "Copied!" : "Copy Link"}</span>
      </Button>
      
      {isShareSupported && (
        <Button 
          variant="outline" 
          size="sm" 
          className="flex items-center gap-1 mobile-tap-area h-10 min-h-10" 
          onClick={handleNativeShare}
          aria-label="Share using native share dialog"
        >
          <Share2 className="h-4 w-4" aria-hidden="true" />
          <span className="hidden sm:inline">More</span>
        </Button>
      )}
    </div>
  )
}